export class Modal {
    constructor(modal_id, open_id) {
        var _a;
        this.modalContainer = document.getElementById(modal_id);
        this.closeButton = (_a = this.modalContainer) === null || _a === void 0 ? void 0 : _a.querySelector('.modal_button_close');
        this.openButton = document.getElementById(open_id);
        if (this.openButton != undefined &&
            this.closeButton != undefined &&
            this.modalContainer != undefined) {
            this.init();
        }
    }
    init() {
        var _a, _b;
        (_a = this.openButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            this.onOpen();
        });
        (_b = this.closeButton) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
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