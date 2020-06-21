export class AjaxManager
{
    /**
     * For all other requests
     * @param callback function to be called after server response
     */
    public ajax_custom_request(param: string, callback: Function)
    {
        let xmlRequest = new XMLHttpRequest();
        let url = 'user_management/action.php';

        xmlRequest.addEventListener('load', () => { callback(xmlRequest); } );

        xmlRequest.open('POST', url, true);
        xmlRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlRequest.send(param);
    }

    /**
     * Requests login to server
     * @param username 
     * @param password 
     * @param callback function to be called after server response
     */
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

    /**
     * Tries to logout from current session
     * @param callback function to be called after server response
     */
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

    /**
     * Request registration to server
     * @param username 
     * @param email 
     * @param birth 
     * @param password 
     * @param callback function to be called after server response
     */
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