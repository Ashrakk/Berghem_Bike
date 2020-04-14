import { ResponsiveManager } from './responsive.js';
export class UIManager {
    constructor(...allmodals) {
        this.modals = [];
        this.responsive = new ResponsiveManager();
        this.modals = allmodals;
        this.modalState = false;
        this.init();
    }
    init() {
        for (const modal of this.modals) {
            modal.onOpen(() => {
                if (this.modalState === false) //OPEN MODAL
                 {
                    modal.openModal();
                    this.modalState = true;
                }
            });
            modal.onClose(() => {
                if (this.modalState === true) //CLOSE MODAL
                 {
                    modal.closeModal();
                    this.modalState = false;
                }
            });
        }
    }
}
//# sourceMappingURL=uimanager.js.map