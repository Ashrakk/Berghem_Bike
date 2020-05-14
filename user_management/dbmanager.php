<?php
include 'costants.php';
DbManager::get_instance();
class DbManager
{
    private static $costants    = null;
    private static $instance    = null;

    private static $passRegex = '^[a-zA-Z0-9!@#%&_-]+$';
    private static $userRegex = '^[a-zA-Z0-9_]+$';
    private static $nameRegex = '^[a-zA-Z]+$';
    private static $emailRegex = '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';

    public static function get_instance() 
    {
        if ( self::$instance == null ) 
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
                self::$instance = new PDO($dsn, $costants->getDB_user(), $costants->getDB_passwd(), $options);
            } catch (PDOException $e) {
                error_log('FATAL ERROR: PDO DB CONNECTION FAILED!!!');
                error_log($e->getMessage());
                return null;
            }

        }
        return self::$instance;
    }

    public static function query_map()
    {
        $index = 1;

        $statement  = self::$instance->query("SELECT * FROM stations");
        $stations = $statement->fetchAll(PDO::FETCH_ASSOC);
        $statement  = self::$instance->query("SELECT location FROM bikes WHERE bikes.`status` = 'available'");
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

    public static function query_register()
    {

    }
}

/*
USAGE


*/
?>