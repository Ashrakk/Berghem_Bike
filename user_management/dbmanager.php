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

    public static function query_map()
    {
        $index = 1;

        $statement  = self::$pdo->query("SELECT * FROM stations");
        $stations = $statement->fetchAll(PDO::FETCH_ASSOC);
        $statement  = self::$pdo->query("SELECT location FROM bikes WHERE bikes.`status` = 'available'");
        $bikes = $statement->fetchAll(PDO::FETCH_NUM);

        $stations_count = count($stations);
        $bike_array     = array_fill(1, $stations_count, 0);
        $xml            = new SimpleXMLElement("<map_data></map_data>");

        foreach($bikes as $row)
        {
            $bike_array[$row[0]]++;
        }

        foreach($stations as $row)
        {
            $xmlStation = $xml->addChild('Station');
            $xmlStation->addChild('idst',       $row['IDStation']);
            $xmlStation->addChild('lat',        $row['lat']);
            $xmlStation->addChild('lon',        $row['lon']);
            $xmlStation->addChild('slots',      $row['slots']);
            $xmlStation->addChild('available',  $bike_array[$index]);
            $xmlStation->addChild('name',       $row['stationName']);
            $xmlStation->addChild('addr',       $row['stationAddr']);
            $index++;
        }

        return $xml;
    }

    public static function check_user_token()
    {

    }

    public static function query_login($user, $kind)
    {
        $statement  = null;
        $result     = null;
        if($kind)   //if username
        {
            $statement = self::$pdo->prepare("SELECT username, password FROM users WHERE username = ?");
            $result = $statement->execute([$user->getUsername()]);
        }
        else        //if email
        {
            $statement = self::$pdo->prepare("SELECT email, password FROM users WHERE email = ?");
            $result = $statement->execute([$user->getEmail()]);
        }

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
                    $user->setPassword($pass);
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
            }
        }
        return SUCCESS;
    }
}

?>