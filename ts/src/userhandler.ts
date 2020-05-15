import { AjaxManager }          from './ajaxmanager.js';
import { ResponsiveManager }    from './responsive.js';
import { Modal }                from './modal.js';
import { Notification }         from './notifications.js';
import { Constants }            from './constants.js';



export class UserHandler
{
    private constants:          Constants;
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

    constructor(tmpResponsive: ResponsiveManager, tmpNotify: Notification, tmpModals: Modal[])
    {
        this.constants  = new Constants();
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
            
          result = Constants.REGEX_EMAIL.test(str_emailuser);
          if(result == false)
          {
              result = Constants.REGEX_USER.test(str_emailuser);
              if(result == false)
              {
                this.notify?.showCurModalMsgField('Il campo \"Nome utente / Email\" non è valido o contiene caratteri non ammessi', false, false);
                return;
              }
          }
            
          result = Constants.REGEX_PASS.test(str_password);
          if(result == false)
          {
              this.notify?.showCurModalMsgField('Il campo \"Password\" contiene caratteri non ammessi', false, false);
              return;
          }
                
          //Proceed to send request..
          this.ajaxman?.ajax_submit_login( str_emailuser, str_password,
              (xmlRequest: XMLHttpRequest) => 
              {
                let result = xmlRequest.responseText;
                if(result == Constants.SUCCESS)
                {
                  //SAVE LOGGED IN STATUS
                  sessionStorage.setItem('logged', 'true');
                  this.responsive?.switchMenuType(true);
                  
                  if(this.responsive?.isMobileModeActive() == true)
                    this.notify?.showCurModalMsgField('Login eseguito con successo', true, true);
                  else
                    this.notify?.showMessageBox('Login eseguito con successo');
                }
                else
                {
                  switch(result)
                  {
                    case Constants.WRONG_EMAIL_OR_PASS: //Email o password errati
                      this.notify?.showCurModalMsgField('Email o password errati', false, false);
                      break;
                    default:                            //Something went really wrong.
                      this.notify?.showCurModalMsgField('Qualcosa è andato storto.', false, false);
                      break;
                  }
                }
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
      result = Constants.REGEX_USER.test(str_username);
      if(result == false)
      {
        this.notify?.showCurModalMsgField('Il campo \"Nome utente\" contiene caratteri non ammessi', false, false);
        return;
      }
      //REGEX CHECK EMAIL FIELD
      result = Constants.REGEX_EMAIL.test(str_email);
      if(result == false)
      {
        this.notify?.showCurModalMsgField('Il campo \"Email\" non è valido o contiene caratteri non ammessi', false, false);
        return;
      }
      //REGEX CHECK PASSWORD FIELD
      result = Constants.REGEX_PASS.test(str_password);
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
        this.notify?.showCurModalMsgField('La password deve contenere almeno un carattere speciale: ( ~ ! @ # $ % ^ & * _ - ).', false, false);
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
          if(result == Constants.SUCCESS)
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
            switch(result)
            {
              case Constants.USER_ALREADY_EXISTS:   //There is already a user registered with that username or email
                this.notify?.showCurModalMsgField('Esiste già un utente con quel<br>nome utente o email', false, false);
                break;
              case Constants.INVALID_USERNAME:      //The username entered is not valid
                this.notify?.showCurModalMsgField('Il nome utente inserito non è valido', false, false);
                break;
              case Constants.INVALID_EMAIL:         //The email entered is not valid
                this.notify?.showCurModalMsgField('L\'email inserita non è valida', false, false);
                break;
              case Constants.INVALID_DATE:          //The date entered is not valid
                this.notify?.showCurModalMsgField('La data inserita non è valida', false, false);
                break;
              case Constants.INVALID_PASSWORD:      //The password entered is not valid
                this.notify?.showCurModalMsgField('La password inserita non è valida', false, false);
                break; 
              case Constants.LENGHT_LIMIT:      //The password entered is not valid
                this.notify?.showCurModalMsgField('Un campo ha superato il limite di 64 caratteri<br>limite email: 254 caratteri<br>limite password: 72 caratteri', false, false);
                break; 
              default:                              //Something went really wrong.
                this.notify?.showCurModalMsgField('Qualcosa è andato storto.', false, false);
                break;
              }
          }
        });
    }
  }

}