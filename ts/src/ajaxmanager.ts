export class AjaxManager
{
    public ajax_getMapMarkers(callback: Function)
    {
        let xmlRequest = new XMLHttpRequest();
        let url = 'user_management/action.php';
        let param = 'get_map_data=';

        xmlRequest.addEventListener('load', () => { callback(xmlRequest); } );

        xmlRequest.open('POST', url, true);
        xmlRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlRequest.send(param);
    }

    /**
     * send a request to server
     * to check if the user is logged in or not
     * @param callback function to be called after server response
     */
    public ajax_check_user_login_cookie(callback: Function)
    {

        let xmlRequest = new XMLHttpRequest();
        let url = 'user_management/action.php';
        let param = 'check_user=';

        xmlRequest.addEventListener('load', () => { callback(xmlRequest); } );

        xmlRequest.open('POST', url, true);
        xmlRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlRequest.send(param);
    }

    public ajax_submit_login(username: string, password: string, callback: Function)
    {
        let xmlRequest = new XMLHttpRequest();
        let url = 'user_management/action.php';
        let param = `submit_login=true&emailusername=${username}&password=${password}`;
 
        xmlRequest.addEventListener("load", () => { callback(xmlRequest); } );
        
        xmlRequest.open('POST', url, true);
        xmlRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlRequest.send(param);
    }

    public ajax_submit_logout(callback: Function)
    {
        let xmlRequest = new XMLHttpRequest();
        let url = 'user_management/action.php';
        let param = `submit_logout=`;
 
        xmlRequest.addEventListener("load", () => { callback(xmlRequest); } );
        
        xmlRequest.open('POST', url, true);
        xmlRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlRequest.send(param);
    }

    public ajax_submit_reg(username: string, email: string, birth: string, password: string, callback: Function)
    {
        let xmlRequest = new XMLHttpRequest();
        let url = 'user_management/action.php';
        let param = `submit_registration=true&username=${username}&email=${email}&birth=${birth}&password=${password}`;
 
        xmlRequest.addEventListener("load", () => { callback(xmlRequest); } );
        
        xmlRequest.open('POST', url, true);
        xmlRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlRequest.send(param);
    }

}