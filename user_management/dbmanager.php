<?php
include 'costants.php';
DbManager::get_instance();
class DbManager
{
    private static $costants    = null;
    private static $pdo         = null;

    public static function get_instance() 
    {
        if ( self::$pdo == null ) 
        {
            $returnCode = true;
            $costants = Costants::get_instance();
        
            $dsn =  "{$costants->getDB_driver()}:host={$costants->getDB_server()};dbname={$costants->getDB_name()};charset={$costants->getDB_charset()}";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
    
            try 
            {
                self::$pdo = new PDO($dsn, $costants->getDB_user(), $costants->getDB_passwd(), $options);
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

    public static function query_login()
    {

    }

    public static function query_register($data)
    {
        $statement = self::$pdo->prepare("SELECT email, username FROM users WHERE username = ? OR email = ?");
        $result = $statement->execute([$data[0], $data[1]]);
        if(!$result)
            return 0;
        else
        {
            $result = $statement->fetch();
            if($result !== false)
                return -1; //there's a user with the same email/username
            else
            {
                //proceed with insert
                $statement = self::$pdo->prepare("INSERT INTO users (username, email, birthdate, password) VALUES (?, ?, ?, ?);");
                $result = $statement->execute($data);
                if (!$result)
                    return 0;
            }
        }
        return true;
    }
}

/*
USAGE


*/
?>