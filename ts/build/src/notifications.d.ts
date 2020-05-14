import { Modal } from './modal.js';
export declare class Notification {
    private boxTimers;
    private modalTimers;
    private modals;
    private msgBox;
    private contentContainer;
    getModals(): Modal[];
    constructor(allmodals: Modal[], tmpContainer: HTMLElement);
    showMessageBox(str: string): void;
    clearMsgBox(): void;
    showCurModalMsgField(str: string, color: boolean, closemodal: boolean): void;
    clearCurModalMsgField(): void;
    closeCurrentModal(): void;
    getOpenModal(): Modal | undefined;
    clearTimers(str: String): void;
}
