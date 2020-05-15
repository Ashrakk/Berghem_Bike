export class Constants
{
    public static readonly REGEX_PASS = new RegExp('^[a-zA-Z0-9!@#$%^&*_~-]+$');
    public static readonly REGEX_USER = new RegExp('^[a-zA-Z0-9_]+$');
    public static readonly REGEX_EMAIL = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');
    public static readonly REGEX_NAME = new RegExp('^[a-zA-Z]+$');

    public static readonly SUCCESS             =  '1';
    public static readonly GENERAL_ERROR       = ' 0';
    public static readonly INVALID_USERNAME    = '-1';
    public static readonly INVALID_EMAIL       = '-2';
    public static readonly INVALID_DATE        = '-3';
    public static readonly INVALID_PASSWORD    = '-4';
    public static readonly INVALID_NAME        = '-5';
    public static readonly INVALID_SURNAME     = '-6';
    public static readonly INVALID_ADDRESS     = '-7';
    public static readonly USER_NOT_VERIFIED   = '-8';
    public static readonly NOT_ADMIN           = '-9';
    public static readonly USER_ALREADY_EXISTS = '-10';
    public static readonly ALREADY_LOGGED_IN   = '-11';
    public static readonly WRONG_EMAIL_OR_PASS = '-12';
    public static readonly DB_ERROR            = '-13';
    public static readonly LENGHT_LIMIT        = '-14';
}