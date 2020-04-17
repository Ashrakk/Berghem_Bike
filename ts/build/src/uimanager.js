import { ResponsiveManager } from './responsive.js';
import { TouchSwipe } from './touchswipe.js';
export class UIManager {
    constructor(...allmodals) {
        this.modals = [];
        this.responsive = new ResponsiveManager();
        this.pageContainer = this.responsive.getPageContainer();
        this.modals = allmodals;
        this.modalState = false;
        this.init();
    }
    init() {
        var _a;
        if (this.pageContainer != undefined) {
            const mobile = this.responsive.isMobileResponsive();
            if (mobile === true) {
                this.swipe = new TouchSwipe(this.pageContainer, 10);
                this.swipe.onRight(() => {
                    const mobileStatus = this.responsive.isMobileModeActive();
                    const menuStatus = this.responsive.isMenuOpen();
                    if (mobileStatus === true && menuStatus === true) {
                        this.responsive.toggleMenu();
                    }
                });
                this.swipe.onLeft(() => {
                    const mobileStatus = this.responsive.isMobileModeActive();
                    const menuStatus = this.responsive.isMenuOpen();
                    if (mobileStatus === true && menuStatus === false) {
                        this.responsive.toggleMenu();
                    }
                });
                (_a = this.swipe) === null || _a === void 0 ? void 0 : _a.start();
            }
        }
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