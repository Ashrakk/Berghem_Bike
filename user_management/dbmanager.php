<?php
include_once 'user.php';
include_once 'constants.php';

DbManager::get_instance();

class DbManager
{
    private static $pdo = null;
    private static $constants;

    public static function get_instance() 
    {
        if ( self::$pdo == null ) 
        {
            $constants = Constants::get_instance();
        
            $dsn =  "{$constants->getDB_driver()}:host={$constants->getDB_server()};dbname={$constants->getDB_name()};charset={$constants->getDB_charset()}";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
    
            try 
            {
                self::$pdo = new PDO($dsn, $constants->getDB_user(), $constants->getDB_passwd(), $options);
            } catch (PDOException $e) {
                error_log('FATAL ERROR: PDO DB CONNECTION FAILED!!!');
                error_log($e->getMessage());
                return null;
            }

        }
        return self::$pdo;
    }

    public static function validateDate($date, $format = 'Y-m-d')
    {
        $d = DateTime::createFromFormat($format, $date);
        return $d && $d->format($format) === $date;
    }

    public static function query_count_stations()
    {
        $statement  = self::$pdo->query("
        SELECT COUNT(*) AS count
        FROM stations");

        return $statement->fetchAll(PDO::FETCH_NUM)[0][0];
    }

    public static function query_stations($offset = 0, $limit = PHP_INT_MAX)
    {
        $index = 1;

        $statement  = self::$pdo->query("
        SELECT stations.IDStation, stations.lat, stations.lon, stations.stationName, stations.stationAddr, stations.slots, COUNT(*) AS available
        FROM stations
        INNER JOIN bikes
        ON bikes.location = stations.IDStation
        GROUP BY stations.IDStation
        LIMIT $offset, $limit");

        $stations = $statement->fetchAll(PDO::FETCH_BOTH);
        $xml      = new SimpleXMLElement("<map_data></map_data>");
        
        $xml->addChild('count', count($xml));

        foreach($stations as $row)
        {
            $xmlStation = $xml->addChild('Station');
            $xmlStation->addChild('idst',       $row['IDStation']);
            $xmlStation->addChild('lat',        $row['lat']);
            $xmlStation->addChild('lon',        $row['lon']);
            $xmlStation->addChild('name',       $row['stationName']);
            $xmlStation->addChild('addr',       $row['stationAddr']);
            $xmlStation->addChild('slots',      $row['slots']);
            $xmlStation->addChild('available',  $row['available']);
            $index++;
        }

        return $xml;
    }

    public static function check_user_token()
    {

    }

    public static function query_login($user)
    {
        $statement  = null;
        $result     = null;
        if($user->getUsername() != null)   //if username
        {
            $statement = self::$pdo->prepare("SELECT * FROM users WHERE username = ?");
            $result = $statement->execute([$user->getUsername()]);
        }
        else if ($user->getEmail() != null) // if email
        {
            $statement = self::$pdo->prepare("SELECT * FROM users WHERE email = ?");
            $result = $statement->execute([$user->getEmail()]);
        }
        else
            return GENERAL_ERROR;

        if(!$result)
            return DB_ERROR;
        else
        {
            $result = $statement->fetch();
            if($result === false)
                return WRONG_EMAIL_OR_PASS;
            else
            {
                $pass = base64_encode(hash('sha256', $user->getPassword(), true));

                if (password_verify($pass, $result['password']))
                {
                    $user->setPassword('');
                    $user->setUserID($result['IDUser']);
                    $user->setEmail($result['email']);
                    $user->setUsername($result['username']);
                    $user->setName($result['name']);
                    $user->setSurname($result['surname']);
                    $user->setAddress($result['address']);
                    $user->setBirth($result['birthdate']);
                    $user->setVerified($result['verified']);
                    $user->setPrivilege($result['privilege']);
                    return SUCCESS;
                } 
                else 
                {
                    return WRONG_EMAIL_OR_PASS;
                }
            }
        }
    }

    public static function query_register($user)
    {
        $statement = self::$pdo->prepare("SELECT email, username FROM users WHERE username = ? OR email = ?");
        $result = $statement->execute([$user->getUsername(), $user->getEmail()]);

        if(!$result)
            return DB_ERROR;
        else
        {
            $result = $statement->fetch();
            if($result !== false)
                return USER_ALREADY_EXISTS; //there's a user with the same email/username
            else
            {
                //PROCEED WITH INSERT
                $statement = self::$pdo->prepare("INSERT INTO users (username, email, birthdate, password) VALUES (?, ?, ?, ?);");
                $result = $statement->execute([$user->getUsername(), $user->getEmail(), $user->getBirth(), $user->getPassword()]);
                if (!$result)
                    return DB_ERROR;

                $statement = self::$pdo->prepare("SELECT * FROM users WHERE username = ?");
                $result = $statement->execute([$user->getUsername()]);

                $user->setPassword('');
                $user->setUserID($result['IDUser']);
            }
        }
        return SUCCESS;
    }

    public static function countUserActivities($user)
    {
        $id     = $user->getUserID();
        $statement  = self::$pdo->query("
        SELECT COUNT(*) AS count
        FROM rentals
        WHERE IDUser = $id
        ");
        return $statement->fetchAll(PDO::FETCH_NUM)[0][0];
    }

    public static function getUserOverviewActivities($user)
    {
        $id = $user->getUserID();
        $statement  = self::$pdo->query("
        SELECT startTime, endTime, dist
        FROM rentals
        WHERE IDUser = $id
        ");
        return $statement->fetchAll(PDO::FETCH_BOTH);
    }

    public static function getUserActivities($user, $offset, $limit)
    {
        $id = $user->getUserID();
        $statement  = self::$pdo->query("
        SELECT startTime, endTime, stationOrigin.stationName AS originName, stationDest.stationName AS destName, dist        FROM (SELECT *
                 FROM rentals
                 WHERE IDUser = $id
                 ORDER BY convert(startTime, datetime) DESC
                 LIMIT $offset, $limit
                 ) AS tab
                 INNER JOIN stations stationOrigin
                 ON tab.origin = stationOrigin.IDStation  
                  INNER JOIN stations stationDest
                 ON tab.destination = stationDest.IDStation  
        ORDER BY convert(startTime, datetime) DESC
        ");

        return $statement->fetchAll(PDO::FETCH_BOTH);
    }

    public static function getUserTodayActivities($user)
    {
        $id = $user->getUserID();
        $statement  = self::$pdo->query("
        SELECT *
        FROM (SELECT *
             FROM rentals
             WHERE IDUser = $id
             ) tab
             WHERE startTime >= CURDATE() AND
             startTime < DATE_ADD(CURDATE(), INTERVAL 1 DAY);");

        return $statement->fetchAll(PDO::FETCH_BOTH);
    }
}

?>