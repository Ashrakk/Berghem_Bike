export declare class AjaxManager {
    constructor();
    ajax_getMapMarkers(callback: Function): void;
    ajax_check_user_login_status(callback: Function): void;
    ajax_submit_login(username: string, password: string, callback: Function): void;
    ajax_submit_logout(callback: Function): void;
    ajax_submit_reg(username: string, email: string, birth: string, password: string, callback: Function): void;
}
