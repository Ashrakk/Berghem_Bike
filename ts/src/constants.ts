export class Constants
{
    public static readonly REGEX_PASS   = new RegExp('^[a-zA-Z0-9!@#$%^&*_.~-]+$');
    public static readonly REGEX_USER   = new RegExp('^[a-zA-Z0-9_]+$');
    public static readonly REGEX_EMAIL  = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');
    public static readonly REGEX_NAME   = new RegExp('^[a-zA-Z]+$');

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
    public static readonly NOT_LOGGED_IN       = '-15';
    public static readonly SESSION_EXPIRED     = '-16';
    public static readonly TOO_MANY_REQUESTS   = '-17';

    /*USER*/
    public static readonly REQUEST_MAP_MARKERS      = 'get_map_data=';
    public static readonly REQUEST_LOGIN_STATUS     = 'check_user=true';
    public static readonly CHECK_PRIVILEGE_STATUS   = 'check_user_privilege=true';
    /*DASHBOARD */
    public static readonly REQUEST_OVERVIEW         = 'dashboard=true&overview=true';
    public static readonly REQUEST_ACCOUNT_DETAILS  = 'dashboard=true&account-details=true';
    public static readonly REQUEST_BILLING_DETAILS  = 'dashboard=true&billing-details=true';
    public static readonly REQUEST_ACTIVITY_DETAILS = 'dashboard=true&activity-details=true';
    public static readonly REQUEST_ADMIN_MANAGEMENT = 'dashboard=true&admin-management=true';
    public static readonly REQUEST_ADMIN_MANAGE_STATIONS    = 'dashboard=true&manage-stations=true';
    public static readonly REQUEST_ADMIN_MANAGE_BIKES       = 'dashboard=true&manage-bikes=true';
    public static readonly REQUEST_ADMIN_MANAGE_USERS       = 'dashboard=true&manage-users=true';
    /*DASHBOARD QUERIES */
    public static readonly REQUEST_QUERY_ACTIVITY           = 'dashboard=true&query-activity=';
    public static readonly REQUEST_ADMIN_QUERY_STATIONS     = 'dashboard=true&query-stations=';
    public static readonly REQUEST_ADMIN_QUERY_BIKES        = 'dashboard=true&query-bikes=';
    public static readonly REQUEST_ADMIN_QUERY_USERS        = 'dashboard=true&query-users=';
}