<?php

const REGEX_USER   = '/^[a-zA-Z0-9_]+$/';
const REGEX_EMAIL  = '/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/';
const REGEX_PASS   = '/^[a-zA-Z0-9!@#%&_-]+$/';
const REGEX_NAME  = '/^[a-zA-Z]+$/';

final class Costants {

    private static $dbServerName  = 'localhost';
    private static $dbUserName    = 'root';
    private static $dbPassword    = '';
    private static $dbDriver      = 'mysql';
    private static $dbCharset     = 'utf8mb4';
    private static $dbName        = 'bikesharing';

    private static $usersCache = array();

    public static function getUserCache() { return self::$usersCache; }

    private static $instance = null;

    private function __construct() 
    { }

    public static function get_instance() 
    {
        if ( null == self::$instance ) {
          self::$instance = new self;
        }
        return self::$instance;
    }

    public static function getDB_server()
    { return self::$dbServerName; }

    public static function getDB_user()
    { return self::$dbUserName; }

    public static function getDB_passwd()
    { return self::$dbPassword; }

    public static function getDB_driver()
    { return self::$dbDriver; }

    public static function getDB_charset()
    { return self::$dbCharset; }

    public static function getDB_name()
    { return self::$dbName; }

}

/*
USAGE

$constants = Costants::get_instance();
$constants->callfunction();
*/

?>