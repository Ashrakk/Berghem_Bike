import { Modal } from './modal.js';
export declare class UIManager {
    private responsive;
    private userhandler;
    private notify;
    private swipe;
    private pageContainer;
    private modals;
    constructor(...allmodals: Modal[]);
    private init;
    submit_login(): void;
    submit_logout(): void;
    submit_reg(): void;
}
