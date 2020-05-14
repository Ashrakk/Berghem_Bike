import { ResponsiveManager } from './responsive.js';
import { Modal } from './modal.js';
import { Notification } from './notifications.js';
export declare class UserHandler {
    private ajaxman;
    private responsive;
    private notify;
    private modals;
    private loginForm;
    private loginModalMsg;
    private loginEmailUsername;
    private loginPassword;
    private regForm;
    private regUsername;
    private regEmail;
    private regBirth;
    private regPassword;
    private regPasswordConfirm;
    private passRegex;
    private userRegex;
    private nameRegex;
    private emailRegex;
    constructor(tmpResponsive: ResponsiveManager, tmpNotify: Notification, tmpModals: Modal[]);
    submit_login(): void;
    submit_logout(): void;
    submit_registration(): void;
}
