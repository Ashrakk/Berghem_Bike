export class Modal {
    constructor(modal_id, open_id) {
        var _a, _b, _c;
        this.openState = false;
        this.modalContainer = document.getElementById(modal_id);
        this.closeButton = (_a = this.modalContainer) === null || _a === void 0 ? void 0 : _a.querySelector('.modal_button_close');
        this.modalContent = (_b = this.modalContainer) === null || _b === void 0 ? void 0 : _b.querySelector('.modal_content');
        this.modalMessage = (_c = this.modalContainer) === null || _c === void 0 ? void 0 : _c.querySelector('.modal_message');
        this.openButton = document.getElementById(open_id);
        if (this.openButton != undefined &&
            this.closeButton != undefined &&
            this.modalContainer != undefined) {
            this.init();
        }
    }
    getCloseButton() { return this.closeButton; }
    getModalMessage() { return this.modalMessage; }
    getState() { return this.openState; }
    setState(state) { this.openState = state; }
    init() {
        var _a, _b, _c, _d;
        (_a = this.openButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            this.onOpen();
        });
        (_b = this.closeButton) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            this.onClose();
        });
        (_c = this.modalContent) === null || _c === void 0 ? void 0 : _c.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        });
        (_d = this.modalContainer) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
            this.onClose();
        });
    }
    onOpen(callback) {
        if (callback != undefined)
            this.onOpen = callback;
    }
    onClose(callback) {
        if (callback != undefined)
            this.onClose = callback;
    }
    openModal() {
        var _a;
        (_a = this.modalContainer) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
    }
    closeModal() {
        var _a;
        (_a = this.modalContainer) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
    }
}
//# sourceMappingURL=modal.js.map