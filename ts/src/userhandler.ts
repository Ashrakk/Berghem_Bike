import { AjaxManager }          from './ajaxmanager.js';
import { ResponsiveManager }    from './responsive.js';
import { Modal }                from './modal.js';
import { Notification }           from './notifications.js';

export class UserHandler
{
    private ajaxman:            AjaxManager | undefined;
    private responsive:         ResponsiveManager | undefined;
    private notify:             Notification | undefined;
    private modals:             Modal[] = [];

    private loginForm:          HTMLElement | undefined | null;
    private loginModalMsg:      HTMLElement | undefined | null;
    private loginEmailUsername: HTMLInputElement | undefined | null;
    private loginPassword:      HTMLInputElement | undefined | null;
  
    private regForm:            HTMLElement | undefined | null;
    private regUsername:        HTMLInputElement | undefined | null;
    private regEmail:           HTMLInputElement | undefined | null;
    private regBirth:           HTMLInputElement | undefined | null;
    private regPassword:        HTMLInputElement | undefined | null;
    private regPasswordConfirm: HTMLInputElement | undefined | null;
  
    private passRegex = new RegExp('^[a-zA-Z0-9!@#%&_-]+$');
    private userRegex = new RegExp('^[a-zA-Z0-9_]+$');
    private nameRegex = new RegExp('^[a-zA-Z]+$');
    private emailRegex = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');
  

    constructor(tmpResponsive: ResponsiveManager, tmpNotify: Notification, tmpModals: Modal[])
    {
        this.responsive = tmpResponsive;
        this.notify     = tmpNotify;
        this.modals     = tmpModals;
        this.ajaxman    = new AjaxManager(); 

        this.loginForm          = document.getElementById('login_form');
        this.loginModalMsg      = this.loginForm?.querySelector('div[class=\'modal_error_view\']')  as HTMLElement | null;
        this.loginEmailUsername = this.loginForm?.querySelector('input[name=\'emailusername\']')    as HTMLInputElement | null;
        this.loginPassword      = this.loginForm?.querySelector('input[name=\'password\']')         as HTMLInputElement | null;
    
        this.regForm          = document.getElementById('reg_form');
        this.regUsername      = this.regForm?.querySelector('input[name=\'username\']')           as HTMLInputElement | null;
        this.regEmail         = this.regForm?.querySelector('input[name=\'email\']')              as HTMLInputElement | null;
        this.regBirth         = this.regForm?.querySelector('input[name=\'birthdate\']')          as HTMLInputElement | null;
        this.regPassword      = this.regForm?.querySelector('input[name=\'password\']')           as HTMLInputElement | null;
        this.regPasswordConfirm = this.regForm?.querySelector('input[name=\'passwordConfirm\']')  as HTMLInputElement | null;
    }
  
    public submit_login()
    {
        //get data from form    
        let str_emailuser = this.loginEmailUsername?.value;
        let str_password = this.loginPassword?.value;
        let result = false;

        //check input data with regex
        if(str_emailuser != undefined && str_password != undefined)
        {
          if(str_emailuser == '' || str_password == '')
          {
            this.notify?.showCurModalMsgField('Alcuni campi sono vuoti', false, false);
            return;
          }
            
          result = this.emailRegex.test(str_emailuser);
          if(result == false)
          {
              result = this.userRegex.test(str_emailuser);
              if(result == false)
              {
                this.notify?.showCurModalMsgField('Il campo \"Nome utente / Email\" non è valido o contiene caratteri non ammessi', false, false);
                return;
              }
          }
            
          result = this.passRegex.test(str_password);
          if(result == false)
          {
              this.notify?.showCurModalMsgField('Il campo \"Password\" contiene caratteri non ammessi', false, false);
              return;
          }
                
          //Proceed to send request..
          this.ajaxman?.ajax_submit_login( str_emailuser, str_password,
              (xmlRequest: XMLHttpRequest) => 
              {
              //SAVE LOGGED IN STATUS
              sessionStorage.setItem('logged', 'true');
              this.responsive?.switchMenuType(true);
              
              if(this.responsive?.isMobileModeActive() == true)
                this.notify?.showCurModalMsgField('Login eseguito con successo', true, true);
              else
                this.notify?.showMessageBox('Login eseguito con successo');
              });
        }
    }

  public submit_logout()
  {
    this.ajaxman?.ajax_submit_logout(
      (xmlRequest: XMLHttpRequest) => 
      {
        this.responsive?.switchMenuType(false);
        sessionStorage.setItem('logged', 'false');
      });
  }

  public submit_registration()
  {
    //get data from form    
    let str_username    = this.regUsername?.value;
    let str_email       = this.regEmail?.value;
    let str_birthdate   = this.regBirth?.value;
    let str_password    = this.regPassword?.value;
    let str_passwordConfirm = this.regPasswordConfirm?.value;
    let result = false;

    if(str_username   != undefined &&
       str_email      != undefined &&
       str_birthdate  != undefined &&
       str_password   != undefined &&
       str_passwordConfirm != undefined)
    {
      if(str_username  == '' ||
        str_email      == '' ||
        str_birthdate  == '' ||
        str_password   == '' ||
        str_passwordConfirm == '')
      {
        this.notify?.showCurModalMsgField('Alcuni campi sono vuoti', false, false);
        return;
      }

      if(str_birthdate == "")
      {
        this.notify?.showCurModalMsgField('La data di nascita non è stata inserita', false, false);
        return;   
      }
      else
      {
        let birthdate = new Date(str_birthdate);
        let today = new Date();
        let age = today.getFullYear() - birthdate.getFullYear();
        let m = today.getMonth() - birthdate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }
        if(age < 14)
        {
          this.notify?.showCurModalMsgField('Devi avere almeno 14 anni per registrarti', false, false);
          return;         
        }
        if(birthdate.toString() == 'Invalid Date' || birthdate == undefined || age > 100)
        {
          this.notify?.showCurModalMsgField('La data di nascita immessa non è valida', false, false);
          return;      
        }
      }

      //REGEX CHECK USERNAME FIELD
      result = this.userRegex.test(str_username);
      if(result == false)
      {
        this.notify?.showCurModalMsgField('Il campo \"Nome utente\" contiene caratteri non ammessi', false, false);
        return;
      }
      //REGEX CHECK EMAIL FIELD
      result = this.emailRegex.test(str_email);
      if(result == false)
      {
        this.notify?.showCurModalMsgField('Il campo \"Email\" non è valido o contiene caratteri non ammessi', false, false);
        return;
      }
      //REGEX CHECK PASSWORD FIELD
      result = this.passRegex.test(str_password);
      if(result == false)
      {
        this.notify?.showCurModalMsgField('Il campo \"Password\" contiene caratteri non ammessi', false, false);
        return;
      }
      //CHECK PASSWORD AND CONFIRM PASSWORD
      if(str_password != str_passwordConfirm)
      {
        this.notify?.showCurModalMsgField('I campi \"Password e Conferma password\" non combaciano', false, false);
        return;    
      }

      //CHECK PASSWORD LENGHT

      if (str_password.length < 12)
      {
        this.notify?.showCurModalMsgField('La password dev\'essere lunga almeno 12 caratteri', false, false);
        return;    
      }

      //CHECK PASSWORD CONTAINS AT LEAST 1 SPECIAL CHAR

      if (str_password.match('[!@#%&_-]') == null)
      {
        this.notify?.showCurModalMsgField('La password deve contenere almeno un carattere speciale: ( ! @ # % & _ - ).', false, false);
        return;    
      }

      //CHECK PASSWORD CONTAINS AT LEAST 1 UPPERCASE CHAR
      if (str_password.match('[A-Z]') == null)
      {
        this.notify?.showCurModalMsgField('La password deve contenere almeno un carattere maiuscolo', false, false);
        return;    
      }

      //And finally, proceed to send request..
      this.ajaxman?.ajax_submit_reg( 
        str_username,
        str_email,
        str_birthdate,
        str_password,
        (xmlRequest: XMLHttpRequest) => 
        {
          let result = xmlRequest.responseText;
          if(result == 'true')
          {
            //SAVE LOGGED IN STATUS
            sessionStorage.setItem('logged', 'true');
            this.responsive?.switchMenuType(true);
            
            if(this.responsive?.isMobileModeActive() == true)
              this.notify?.showCurModalMsgField('Registrazione eseguita con successo, un\'email di verifica è stata inviata alla tua casella di posta', true, true);
            else
              this.notify?.showMessageBox('Registrazione eseguita con successo, un\'email di verifica è stata inviata alla tua casella di posta');
          }
          else
          {
            this.notify?.showCurModalMsgField('Qualcosa è andato storto', false, false);
          }
        });
    }
  }

}