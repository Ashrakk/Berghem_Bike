export class Notification {
    constructor(allmodals, tmpContainer) {
        this.modals = [];
        this.boxTimers = new Array();
        this.modalTimers = new Array();
        this.modals = allmodals;
        this.contentContainer = tmpContainer;
        this.msgBox = document.getElementById('messageBox');
    }
    getModals() { return this.modals; }
    ;
    showMessageBox(str) {
        var _a, _b, _c;
        let tmpTimer;
        this.clearTimers('box');
        this.clearMsgBox();
        if (str != undefined &&
            this.msgBox != undefined) {
            this.msgBox.innerHTML = str;
            (_a = this.contentContainer) === null || _a === void 0 ? void 0 : _a.classList.add("div_center_messageShow");
            this.msgBox.classList.add("messageBoxAfter");
            this.msgBox.classList.add("anim_fadeIn");
            this.msgBox.classList.remove("hidden");
            this.closeCurrentModal();
            tmpTimer = setTimeout(() => {
                if (this.msgBox != undefined) {
                    this.msgBox.classList.remove("anim_fadeIn");
                    this.msgBox.classList.add("anim_fadeOut");
                }
            }, 5000);
            (_b = this.boxTimers) === null || _b === void 0 ? void 0 : _b.push(tmpTimer);
            tmpTimer = setTimeout(() => {
                var _a;
                if (this.msgBox != undefined) {
                    this.msgBox.classList.add("hidden");
                    this.msgBox.classList.remove("anim_fadeOut");
                    this.msgBox.classList.remove("messageBoxAfter");
                    (_a = this.contentContainer) === null || _a === void 0 ? void 0 : _a.classList.remove("div_center_messageShow");
                    this.msgBox.innerHTML = "";
                    this.boxTimers = [];
                }
            }, 5300);
            (_c = this.boxTimers) === null || _c === void 0 ? void 0 : _c.push(tmpTimer);
        }
    }
    clearMsgBox() {
        var _a;
        if (this.msgBox != undefined) {
            this.msgBox.classList.add("hidden");
            this.msgBox.classList.remove("anim_fadeOut");
            this.msgBox.classList.remove("messageBoxAfter");
            (_a = this.contentContainer) === null || _a === void 0 ? void 0 : _a.classList.remove("div_center_messageShow");
            this.msgBox.innerHTML = "";
        }
    }
    showCurModalMsgField(str, color, closemodal) {
        var _a, _b;
        let state = false;
        var tmpTimer;
        var modalMsg;
        var str_color;
        this.clearTimers('modal');
        this.clearCurModalMsgField();
        if (color == false)
            str_color = 'messageRed';
        else
            str_color = 'messageGreen';
        let modal = this.getOpenModal();
        if (modal != undefined) {
            modalMsg = modal.getModalMessage();
            if (modalMsg != undefined) {
                modalMsg.innerHTML = str;
                modalMsg.classList.add(str_color);
                modalMsg.classList.add("modal_message_open");
                modalMsg.classList.add("anim_fadeIn");
                modalMsg.classList.remove("hidden");
                tmpTimer = setTimeout(() => {
                    if (modalMsg != undefined) {
                        modalMsg.classList.remove("anim_fadeIn");
                        modalMsg.classList.add("anim_fadeOut");
                    }
                }, 5000);
                (_a = this.modalTimers) === null || _a === void 0 ? void 0 : _a.push(tmpTimer);
                tmpTimer = setTimeout(() => {
                    modalMsg.classList.add("hidden");
                    modalMsg.classList.remove("anim_fadeOut");
                    modalMsg.classList.remove("modal_message_open");
                    modalMsg.classList.remove(str_color);
                    modalMsg.innerHTML = "";
                    if (closemodal == true)
                        this.closeCurrentModal();
                    this.modalTimers = [];
                }, 5300);
                (_b = this.modalTimers) === null || _b === void 0 ? void 0 : _b.push(tmpTimer);
            }
        }
    }
    clearCurModalMsgField() {
        let modal = this.getOpenModal();
        if (modal != undefined) {
            let msg = modal.getModalMessage();
            msg.classList.add("hidden");
            msg.classList.remove("messageRed", "messageGreen", "anim_fadeOut", "anim_fadeIn", "modal_message_open");
            msg.innerHTML = "";
        }
    }
    closeCurrentModal() {
        let modal = this.getOpenModal();
        if (modal != undefined)
            modal.getCloseButton().click();
    }
    getOpenModal() {
        let state = false;
        for (const modal of this.modals) {
            state = modal.getState();
            if (state == true)
                return modal;
        }
        return undefined;
    }
    clearTimers(str) {
        let timers;
        if (str == 'modal')
            timers = this.modalTimers;
        else if (str == 'box')
            timers = this.boxTimers;
        else
            return;
        if (timers != undefined) {
            for (let index = 0, len = timers.length; index < len; index++) {
                clearTimeout(timers[index]);
            }
        }
    }
}
//# sourceMappingURL=notifications.js.map