<?php

include 'costants.php';

class DbManager{

    private static $costants;
    private $dbPdo;

    public function init()
    {
        $costants = Costants::get_instance();
        
        $dsn =  "{$costants->getDB_driver()}:host={$costants->getDB_server()};dbname={$costants->getDB_name()};charset={$costants->getDB_charset()}";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try 
        {
            $this->dbPdo = new PDO($dsn, $costants->getDB_user(), $costants->getDB_passwd(), $options);
        } catch (PDOException $e) {
            return $e->getMessage();
        }
        return true;
    }

    public function query_map()
    {

    }

    public function query_map_adv()
    {

    }

    public function check_user_token()
    {

    }
}

/*
USAGE


*/

?>

