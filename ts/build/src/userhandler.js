import { AjaxManager } from './ajaxmanager.js';
export class UserHandler {
    constructor(tmpResponsive, tmpNotify, tmpModals) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.modals = [];
        this.passRegex = new RegExp('^[a-zA-Z0-9!@#%&_-]+$');
        this.userRegex = new RegExp('^[a-zA-Z0-9_]+$');
        this.nameRegex = new RegExp('^[a-zA-Z]+$');
        this.emailRegex = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');
        this.responsive = tmpResponsive;
        this.notify = tmpNotify;
        this.modals = tmpModals;
        this.ajaxman = new AjaxManager();
        this.loginForm = document.getElementById('login_form');
        this.loginModalMsg = (_a = this.loginForm) === null || _a === void 0 ? void 0 : _a.querySelector('div[class=\'modal_error_view\']');
        this.loginEmailUsername = (_b = this.loginForm) === null || _b === void 0 ? void 0 : _b.querySelector('input[name=\'emailusername\']');
        this.loginPassword = (_c = this.loginForm) === null || _c === void 0 ? void 0 : _c.querySelector('input[name=\'password\']');
        this.regForm = document.getElementById('reg_form');
        this.regUsername = (_d = this.regForm) === null || _d === void 0 ? void 0 : _d.querySelector('input[name=\'username\']');
        this.regEmail = (_e = this.regForm) === null || _e === void 0 ? void 0 : _e.querySelector('input[name=\'email\']');
        this.regBirth = (_f = this.regForm) === null || _f === void 0 ? void 0 : _f.querySelector('input[name=\'birthdate\']');
        this.regPassword = (_g = this.regForm) === null || _g === void 0 ? void 0 : _g.querySelector('input[name=\'password\']');
        this.regPasswordConfirm = (_h = this.regForm) === null || _h === void 0 ? void 0 : _h.querySelector('input[name=\'passwordConfirm\']');
    }
    submit_login() {
        var _a, _b, _c, _d, _e, _f;
        let str_emailuser = (_a = this.loginEmailUsername) === null || _a === void 0 ? void 0 : _a.value;
        let str_password = (_b = this.loginPassword) === null || _b === void 0 ? void 0 : _b.value;
        let result = false;
        if (str_emailuser != undefined && str_password != undefined) {
            if (str_emailuser == '' || str_password == '') {
                (_c = this.notify) === null || _c === void 0 ? void 0 : _c.showCurModalMsgField('Alcuni campi sono vuoti', false, false);
                return;
            }
            result = this.emailRegex.test(str_emailuser);
            if (result == false) {
                result = this.userRegex.test(str_emailuser);
                if (result == false) {
                    (_d = this.notify) === null || _d === void 0 ? void 0 : _d.showCurModalMsgField('Il campo \"Nome utente / Email\" non è valido o contiene caratteri non ammessi', false, false);
                    return;
                }
            }
            result = this.passRegex.test(str_password);
            if (result == false) {
                (_e = this.notify) === null || _e === void 0 ? void 0 : _e.showCurModalMsgField('Il campo \"Password\" contiene caratteri non ammessi', false, false);
                return;
            }
            (_f = this.ajaxman) === null || _f === void 0 ? void 0 : _f.ajax_submit_login(str_emailuser, str_password, (xmlRequest) => {
                var _a, _b, _c, _d;
                sessionStorage.setItem('logged', 'true');
                (_a = this.responsive) === null || _a === void 0 ? void 0 : _a.switchMenuType(true);
                if (((_b = this.responsive) === null || _b === void 0 ? void 0 : _b.isMobileModeActive()) == true)
                    (_c = this.notify) === null || _c === void 0 ? void 0 : _c.showCurModalMsgField('Login eseguito con successo', true, true);
                else
                    (_d = this.notify) === null || _d === void 0 ? void 0 : _d.showMessageBox('Login eseguito con successo');
            });
        }
    }
    submit_logout() {
        var _a;
        (_a = this.ajaxman) === null || _a === void 0 ? void 0 : _a.ajax_submit_logout((xmlRequest) => {
            var _a;
            (_a = this.responsive) === null || _a === void 0 ? void 0 : _a.switchMenuType(false);
            sessionStorage.setItem('logged', 'false');
        });
    }
    submit_registration() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        let str_username = (_a = this.regUsername) === null || _a === void 0 ? void 0 : _a.value;
        let str_email = (_b = this.regEmail) === null || _b === void 0 ? void 0 : _b.value;
        let str_birthdate = (_c = this.regBirth) === null || _c === void 0 ? void 0 : _c.value;
        let str_password = (_d = this.regPassword) === null || _d === void 0 ? void 0 : _d.value;
        let str_passwordConfirm = (_e = this.regPasswordConfirm) === null || _e === void 0 ? void 0 : _e.value;
        let result = false;
        if (str_username != undefined &&
            str_email != undefined &&
            str_birthdate != undefined &&
            str_password != undefined &&
            str_passwordConfirm != undefined) {
            if (str_username == '' ||
                str_email == '' ||
                str_birthdate == '' ||
                str_password == '' ||
                str_passwordConfirm == '') {
                (_f = this.notify) === null || _f === void 0 ? void 0 : _f.showCurModalMsgField('Alcuni campi sono vuoti', false, false);
                return;
            }
            if (str_birthdate == "") {
                (_g = this.notify) === null || _g === void 0 ? void 0 : _g.showCurModalMsgField('La data di nascita non è stata inserita', false, false);
                return;
            }
            else {
                let birthdate = new Date(str_birthdate);
                let today = new Date();
                let age = today.getFullYear() - birthdate.getFullYear();
                let m = today.getMonth() - birthdate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
                    age--;
                }
                if (age < 14) {
                    (_h = this.notify) === null || _h === void 0 ? void 0 : _h.showCurModalMsgField('Devi avere almeno 14 anni per registrarti', false, false);
                    return;
                }
                if (birthdate.toString() == 'Invalid Date' || birthdate == undefined || age > 100) {
                    (_j = this.notify) === null || _j === void 0 ? void 0 : _j.showCurModalMsgField('La data di nascita immessa non è valida', false, false);
                    return;
                }
            }
            result = this.userRegex.test(str_username);
            if (result == false) {
                (_k = this.notify) === null || _k === void 0 ? void 0 : _k.showCurModalMsgField('Il campo \"Nome utente\" contiene caratteri non ammessi', false, false);
                return;
            }
            result = this.emailRegex.test(str_email);
            if (result == false) {
                (_l = this.notify) === null || _l === void 0 ? void 0 : _l.showCurModalMsgField('Il campo \"Email\" non è valido o contiene caratteri non ammessi', false, false);
                return;
            }
            result = this.passRegex.test(str_password);
            if (result == false) {
                (_m = this.notify) === null || _m === void 0 ? void 0 : _m.showCurModalMsgField('Il campo \"Password\" contiene caratteri non ammessi', false, false);
                return;
            }
            if (str_password != str_passwordConfirm) {
                (_o = this.notify) === null || _o === void 0 ? void 0 : _o.showCurModalMsgField('I campi \"Password e Conferma password\" non combaciano', false, false);
                return;
            }
            if (str_password.length < 12) {
                (_p = this.notify) === null || _p === void 0 ? void 0 : _p.showCurModalMsgField('La password dev\'essere lunga almeno 12 caratteri', false, false);
                return;
            }
            if (str_password.match('[!@#%&_-]') == null) {
                (_q = this.notify) === null || _q === void 0 ? void 0 : _q.showCurModalMsgField('La password deve contenere almeno un carattere speciale: ( ! @ # % & _ - ).', false, false);
                return;
            }
            if (str_password.match('[A-Z]') == null) {
                (_r = this.notify) === null || _r === void 0 ? void 0 : _r.showCurModalMsgField('La password deve contenere almeno un carattere maiuscolo', false, false);
                return;
            }
            (_s = this.ajaxman) === null || _s === void 0 ? void 0 : _s.ajax_submit_reg(str_username, str_email, str_birthdate, str_password, (xmlRequest) => {
                var _a, _b, _c, _d;
                sessionStorage.setItem('logged', 'true');
                (_a = this.responsive) === null || _a === void 0 ? void 0 : _a.switchMenuType(true);
                if (((_b = this.responsive) === null || _b === void 0 ? void 0 : _b.isMobileModeActive()) == true)
                    (_c = this.notify) === null || _c === void 0 ? void 0 : _c.showCurModalMsgField('Registrazione eseguita con successo, un\'email di verifica è stata inviata alla tua casella di posta', true, true);
                else
                    (_d = this.notify) === null || _d === void 0 ? void 0 : _d.showMessageBox('Registrazione eseguita con successo, un\'email di verifica è stata inviata alla tua casella di posta');
            });
        }
    }
}
//# sourceMappingURL=userhandler.js.map