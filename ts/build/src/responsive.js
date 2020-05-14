export class ResponsiveManager {
    constructor(width, menu_right_type) {
        var _a, _b;
        this.allColumnsOriginalClasses = [];
        this.mobileWidth = width;
        this.menuNavbar = document.getElementById('id-navbar');
        this.menuRightDefault = document.getElementById('id-menu-right-default');
        this.menuRightLogged = document.getElementById('id-menu-right-logged');
        this.menuLeft = document.getElementById('id-menu-left');
        this.menuOpenerContainer = document.getElementById('id-menu-right-dropdown-container');
        this.menuOpener = document.getElementById('id-menu-right-dropdown');
        this.menuLogo = document.getElementById('id-logo');
        this.menuStatus = false;
        this.pageContainer = document.getElementById('id-page-container');
        this.pageLoader = document.getElementById('id-page-loader');
        this.allColumnsElements = document.querySelectorAll('.div_internal_column, .column_width_1e6, .column_width_1e5, .column_width_1e4, .column_width_1e3');
        this.allRowElements = document.querySelectorAll('.div_internal_row:not(.flexColumn)');
        this.shadowElements = document.querySelectorAll('.boxshadow');
        this.mainContentContainer = document.getElementById('id-main-content-container');
        this.modals = document.querySelectorAll('.modal_content');
        this.mobileResponsive = false;
        this.mobileStatus = false;
        this.init();
        this.switchMenuType(menu_right_type);
        (_a = this.pageLoader) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        (_b = this.pageContainer) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
    }
    isMenuOpen() {
        return this.menuStatus;
    }
    getMenuNavbar() {
        return this.menuNavbar;
    }
    getPageContainer() {
        return this.pageContainer;
    }
    getContentContainer() {
        return this.mainContentContainer;
    }
    getCurrentRightMenu() {
        return this.currentRightMenu;
    }
    isMobileResponsive() {
        return this.mobileResponsive;
    }
    isMobileModeActive() {
        return this.mobileStatus;
    }
    init() {
        var _a, _b;
        if (this.allColumnsElements != undefined) {
            for (let index = 0; index < ((_a = this.allColumnsElements) === null || _a === void 0 ? void 0 : _a.length); index++) {
                this.allColumnsOriginalClasses.push(this.allColumnsElements.item(index).classList.value);
            }
        }
        this.mobileResponsive = this.mobileCheck();
        this.mobileStatus = false;
        this.handleResponsiveness();
        window.addEventListener('resize', (evt) => {
            this.handleResponsiveness();
        });
        window.addEventListener('pageshow', (evt) => {
            this.handleResponsiveness();
        });
        (_b = this.menuOpener) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            this.toggleMenu();
        });
    }
    mobileCheck() {
        let isMobile = false;
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(window.navigator.userAgent) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(window.navigator.userAgent.substr(0, 4))) {
            isMobile = true;
        }
        return isMobile;
    }
    mobileMode(status) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (status === true && status !== this.mobileStatus) {
            if (this.allColumnsElements != undefined &&
                this.allRowElements != undefined &&
                this.shadowElements != undefined &&
                this.modals != undefined) {
                for (let index = 0; index < ((_a = this.allColumnsElements) === null || _a === void 0 ? void 0 : _a.length); index++) {
                    this.allColumnsElements
                        .item(index)
                        .classList.remove('div_internal_column', 'column_width_1e6', 'column_width_1e5', 'column_width_1e4', 'column_width_1e3');
                    this.allColumnsElements.item(index).classList.add('paddingBottom20');
                }
                for (let index = 0; index < ((_b = this.allRowElements) === null || _b === void 0 ? void 0 : _b.length); index++) {
                    this.allRowElements.item(index).classList.add('flexColumn');
                }
                for (let index = 0; index < ((_c = this.shadowElements) === null || _c === void 0 ? void 0 : _c.length); index++) {
                    this.shadowElements.item(index).classList.remove('boxshadow');
                }
                for (let index = 0; index < ((_d = this.modals) === null || _d === void 0 ? void 0 : _d.length); index++) {
                    this.modals.item(index).classList.add('modal_content_mobile');
                }
            }
            this.mobileStatus = status;
        }
        else if (status === false && status !== this.mobileStatus) {
            (_e = this.menuOpener) === null || _e === void 0 ? void 0 : _e.classList.remove('menu-right-dropdown-responsive');
            if (this.allColumnsElements != undefined &&
                this.allRowElements != undefined &&
                this.shadowElements != undefined &&
                this.modals != undefined) {
                for (let index = 0; index < ((_f = this.allColumnsElements) === null || _f === void 0 ? void 0 : _f.length); index++) {
                    this.allColumnsElements.item(index).classList.value = this.allColumnsOriginalClasses[index];
                }
                for (let index = 0; index < ((_g = this.shadowElements) === null || _g === void 0 ? void 0 : _g.length); index++) {
                    this.shadowElements.item(index).classList.add('boxshadow');
                }
                for (let index = 0; index < ((_h = this.allRowElements) === null || _h === void 0 ? void 0 : _h.length); index++) {
                    this.allRowElements.item(index).classList.remove('flexColumn');
                }
                for (let index = 0; index < ((_j = this.modals) === null || _j === void 0 ? void 0 : _j.length); index++) {
                    this.modals.item(index).classList.remove('modal_content_mobile');
                }
            }
            this.mobileStatus = status;
        }
    }
    handleResponsiveness() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        const width = window.innerWidth;
        if ((width < this.mobileWidth || this.mobileResponsive === true) &&
            this.mobileStatus === false) {
            this.mobileMode(true);
        }
        else if (width > this.mobileWidth &&
            this.mobileResponsive === false &&
            this.mobileStatus === true) {
            this.mobileMode(false);
        }
        if ((width < this.mobileWidth || this.mobileResponsive === true) &&
            this.menuStatus === false) {
            (_a = this.menuLeft) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
            (_b = this.currentRightMenu) === null || _b === void 0 ? void 0 : _b.classList.add('hidden');
            (_c = this.menuOpenerContainer) === null || _c === void 0 ? void 0 : _c.classList.remove('hidden');
            (_d = this.mainContentContainer) === null || _d === void 0 ? void 0 : _d.classList.remove('div_center_menu_open');
        }
        if ((width < this.mobileWidth || this.mobileResponsive === true) &&
            this.menuStatus === true) {
            (_e = this.menuLeft) === null || _e === void 0 ? void 0 : _e.classList.remove('hidden');
            (_f = this.currentRightMenu) === null || _f === void 0 ? void 0 : _f.classList.remove('hidden');
            (_g = this.mainContentContainer) === null || _g === void 0 ? void 0 : _g.classList.add('div_center_menu_open');
        }
        else if (width > this.mobileWidth &&
            this.mobileResponsive === false &&
            this.menuStatus === false) {
            (_h = this.menuLeft) === null || _h === void 0 ? void 0 : _h.classList.remove('hidden');
            (_j = this.currentRightMenu) === null || _j === void 0 ? void 0 : _j.classList.remove('hidden');
            (_k = this.menuOpenerContainer) === null || _k === void 0 ? void 0 : _k.classList.add('hidden');
            (_l = this.mainContentContainer) === null || _l === void 0 ? void 0 : _l.classList.remove('div_center_menu_open');
        }
        else if (width > this.mobileWidth &&
            this.mobileResponsive === false &&
            this.menuStatus === true) {
            (_m = this.menuLeft) === null || _m === void 0 ? void 0 : _m.classList.remove('hidden');
            (_o = this.currentRightMenu) === null || _o === void 0 ? void 0 : _o.classList.remove('hidden');
            (_p = this.menuOpenerContainer) === null || _p === void 0 ? void 0 : _p.classList.add('hidden');
            this.toggleMenu();
        }
    }
    toggleMenu() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        if (this.menuStatus === true) {
            (_a = this.mainContentContainer) === null || _a === void 0 ? void 0 : _a.classList.remove('div_center_menu_open');
            (_b = this.menuNavbar) === null || _b === void 0 ? void 0 : _b.classList.remove('div_navbar_menu_open', 'anim_menuFadeIn');
            (_c = this.menuNavbar) === null || _c === void 0 ? void 0 : _c.classList.add('anim_menuFadeOut');
            (_d = this.menuLeft) === null || _d === void 0 ? void 0 : _d.classList.remove('general_menu_open');
            (_e = this.menuLeft) === null || _e === void 0 ? void 0 : _e.classList.add('hidden');
            (_f = this.currentRightMenu) === null || _f === void 0 ? void 0 : _f.classList.add('hidden');
            (_g = this.menuRightDefault) === null || _g === void 0 ? void 0 : _g.classList.remove('general_menu_open', 'menu_right_open');
            (_h = this.menuRightLogged) === null || _h === void 0 ? void 0 : _h.classList.remove('general_menu_open', 'menu_right_open');
            if (this.menuLogo != undefined && this.menuOpener != undefined) {
                (_j = this.menuOpenerContainer) === null || _j === void 0 ? void 0 : _j.insertAdjacentElement('beforeend', this.menuOpener);
                (_k = this.menuNavbar) === null || _k === void 0 ? void 0 : _k.insertAdjacentElement('afterbegin', this.menuLogo);
            }
            (_l = this.menuOpener) === null || _l === void 0 ? void 0 : _l.classList.remove('menu-right-dropdown-responsive');
        }
        else {
            (_m = this.mainContentContainer) === null || _m === void 0 ? void 0 : _m.classList.add('div_center_menu_open');
            (_o = this.menuNavbar) === null || _o === void 0 ? void 0 : _o.classList.remove('anim_menuFadeOut');
            (_p = this.menuNavbar) === null || _p === void 0 ? void 0 : _p.classList.add('div_navbar_menu_open', 'anim_menuFadeIn');
            (_q = this.menuLeft) === null || _q === void 0 ? void 0 : _q.classList.add('general_menu_open');
            (_r = this.menuRightDefault) === null || _r === void 0 ? void 0 : _r.classList.add('general_menu_open', 'menu_right_open');
            (_s = this.menuRightLogged) === null || _s === void 0 ? void 0 : _s.classList.add('general_menu_open', 'menu_right_open');
            (_t = this.menuLeft) === null || _t === void 0 ? void 0 : _t.classList.remove('hidden');
            (_u = this.currentRightMenu) === null || _u === void 0 ? void 0 : _u.classList.remove('hidden');
            if (this.menuLogo != undefined && this.menuOpener != undefined) {
                (_v = this.menuLeft) === null || _v === void 0 ? void 0 : _v.insertAdjacentElement('afterbegin', this.menuOpener);
                (_w = this.menuNavbar) === null || _w === void 0 ? void 0 : _w.insertAdjacentElement('beforeend', this.menuLogo);
            }
            (_x = this.menuOpener) === null || _x === void 0 ? void 0 : _x.classList.add('menu-right-dropdown-responsive');
        }
        this.menuStatus = !this.menuStatus;
    }
    switchMenuType(menu_type) {
        var _a, _b, _c;
        if (menu_type == true) {
            this.currentRightMenu = this.menuRightLogged;
            (_a = this.menuRightDefault) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
        }
        if (menu_type == false) {
            this.currentRightMenu = this.menuRightDefault;
            (_b = this.menuRightLogged) === null || _b === void 0 ? void 0 : _b.classList.add('hidden');
        }
        (_c = this.currentRightMenu) === null || _c === void 0 ? void 0 : _c.classList.remove('hidden');
        this.handleResponsiveness();
    }
}
//# sourceMappingURL=responsive.js.map