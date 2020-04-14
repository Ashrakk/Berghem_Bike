export declare class Modal {
    private openButton;
    private closeButton;
    private modalContainer;
    constructor(modal_id: string, open_id: string);
    private init;
    onOpen(callback?: () => void): void;
    onClose(callback?: () => void): void;
    openModal(): void;
    closeModal(): void;
}
