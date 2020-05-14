export class AjaxManager {
    constructor() {
    }
    ajax_getMapMarkers(callback) {
        let xmlRequest = new XMLHttpRequest();
        let url = 'user_management/action.php';
        let param = 'get_map_data=';
        xmlRequest.addEventListener('load', () => { callback(xmlRequest); });
        xmlRequest.open('POST', url, true);
        xmlRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlRequest.send(param);
    }
    ajax_check_user_login_status(callback) {
        let xmlRequest = new XMLHttpRequest();
        let url = 'user_management/action.php';
        let param = 'check_user=';
        xmlRequest.addEventListener('load', () => { callback(xmlRequest); });
        xmlRequest.open('POST', url, true);
        xmlRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlRequest.send(param);
    }
    ajax_submit_login(username, password, callback) {
        let xmlRequest = new XMLHttpRequest();
        let url = 'user_management/action.php';
        let param = `submit_login=true&emailusername=${username}&password=${password}`;
        xmlRequest.addEventListener("load", () => { callback(xmlRequest); });
        xmlRequest.open('POST', url, true);
        xmlRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlRequest.send(param);
    }
    ajax_submit_logout(callback) {
        let xmlRequest = new XMLHttpRequest();
        let url = 'user_management/action.php';
        let param = `submit_logout=`;
        xmlRequest.addEventListener("load", () => { callback(xmlRequest); });
        xmlRequest.open('POST', url, true);
        xmlRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlRequest.send(param);
    }
    ajax_submit_reg(username, email, birth, password, callback) {
        let xmlRequest = new XMLHttpRequest();
        let url = 'user_management/action.php';
        let param = `submit_registration=true&username=${username}&email=${email}&birth=${birth}&password=${password}`;
        xmlRequest.addEventListener("load", () => { callback(xmlRequest); });
        xmlRequest.open('POST', url, true);
        xmlRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlRequest.send(param);
    }
}
//# sourceMappingURL=ajaxmanager.js.map