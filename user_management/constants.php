<?php

const REGEX_USER   = '/^[a-zA-Z0-9_]+$/';
const REGEX_EMAIL  = '/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/';
const REGEX_PASS   = '/^[a-zA-Z0-9!@#$%^&*_~-]+$/';
const REGEX_NAME  = '/^[a-zA-Z]+$/';

const SUCCESS             =  1;
const GENERAL_ERROR       =  0;
const INVALID_USERNAME    = -1;
const INVALID_EMAIL       = -2;
const INVALID_DATE        = -3;
const INVALID_PASSWORD    = -4;
const INVALID_NAME        = -5;
const INVALID_SURNAME     = -6;
const INVALID_ADDRESS     = -7;
const USER_NOT_VERIFIED   = -8;
const NOT_ADMIN           = -9;
const USER_ALREADY_EXISTS = -10;
const ALREADY_LOGGED_IN   = -11;
const WRONG_EMAIL_OR_PASS = -12;
const DB_ERROR            = -13;
const LENGHT_LIMIT        = -14;

//constraints
const LENGHT_LIMIT_DEFAULT = 64;
const LENGHT_LIMIT_PASS    = 254;
const LENGHT_LIMIT_EMAIL   = 254;

Constants::get_instance();

final class Constants {

    private static $dbServerName  = 'localhost';
    private static $dbUserName    = 'root';
    private static $dbPassword    = '';
    private static $dbDriver      = 'mysql';
    private static $dbCharset     = 'utf8mb4';
    private static $dbName        = 'bikesharing';

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

?>