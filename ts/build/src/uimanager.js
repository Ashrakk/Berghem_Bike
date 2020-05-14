import { ResponsiveManager } from './responsive.js';
import { TouchSwipe } from './touchswipe.js';
import { UserHandler } from './userhandler.js';
import { Notification } from './notifications.js';
export class UIManager {
    constructor(...allmodals) {
        this.modals = [];
        let logged = false;
        let tmp = sessionStorage.getItem('logged');
        if (tmp == 'true')
            logged = true;
        else
            logged = false;
        this.responsive = new ResponsiveManager(800, logged);
        this.notify = new Notification(allmodals, this.responsive.getContentContainer());
        this.userhandler = new UserHandler(this.responsive, this.notify, this.modals);
        this.pageContainer = this.responsive.getPageContainer();
        this.modals = this.notify.getModals();
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
                if (modal.getState() === false) {
                    modal.openModal();
                    modal.setState(true);
                }
            });
            modal.onClose(() => {
                if (modal.getState() === true) {
                    this.notify.clearCurModalMsgField();
                    this.notify.clearTimers('modal');
                    modal.closeModal();
                    modal.setState(false);
                }
            });
        }
    }
    submit_login() {
        this.userhandler.submit_login();
    }
    submit_logout() {
        this.userhandler.submit_logout();
    }
    submit_reg() {
        this.userhandler.submit_registration();
    }
}
//# sourceMappingURL=uimanager.js.map