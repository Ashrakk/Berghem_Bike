export class MenuManager {
    constructor() {
        this.menuNavbar = document.getElementById('id-navbar');
        this.menuOpener = document.getElementById('drop_down_menu_button');
        this.menuLogo = document.getElementById('id-logo');
        this.menuLeft = document.getElementById('id-menu-left');
        this.menuRight = document.getElementById('id-menu-right');
        this.mainContentContainer = document.getElementById('id-main-content-container');
        this.menuStatus = false;
        window.addEventListener('resize', (evt) => { this.handleMenuResponsiveness(evt); });
        this.handleMenuResponsiveness();
        if (this.menuOpener != undefined) {
            this.menuOpener.addEventListener('click', () => { this.handleMenuButton(); });
        }
        else // error handling
         {
            alert('Error!');
        }
    }
    handleMenuResponsiveness(event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let width = window.innerWidth;
        if (width < 760 && this.menuStatus === false) {
            (_a = this.menuLeft) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
            (_b = this.menuOpener) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
            (_c = this.mainContentContainer) === null || _c === void 0 ? void 0 : _c.classList.remove('div_center_menu_open');
        }
        if (width < 760 && this.menuStatus === true) {
            (_d = this.menuLeft) === null || _d === void 0 ? void 0 : _d.classList.remove('hidden');
            (_e = this.mainContentContainer) === null || _e === void 0 ? void 0 : _e.classList.add('div_center_menu_open');
        }
        else if (width > 760 && this.menuStatus === false) {
            (_f = this.menuLeft) === null || _f === void 0 ? void 0 : _f.classList.remove('hidden');
            (_g = this.menuOpener) === null || _g === void 0 ? void 0 : _g.classList.add('hidden');
            (_h = this.mainContentContainer) === null || _h === void 0 ? void 0 : _h.classList.remove('div_center_menu_open');
        }
        else if (width > 760 && this.menuStatus === true) {
            (_j = this.menuLeft) === null || _j === void 0 ? void 0 : _j.classList.remove('hidden');
            (_k = this.menuOpener) === null || _k === void 0 ? void 0 : _k.classList.add('hidden');
            this.handleMenuButton();
        }
    }
    handleMenuButton() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        if (this.menuStatus === true) //if OPEN, then CLOSE
         {
            (_a = this.mainContentContainer) === null || _a === void 0 ? void 0 : _a.classList.remove('div_center_menu_open');
            (_b = this.menuNavbar) === null || _b === void 0 ? void 0 : _b.classList.remove('div_navbar_menu_open', 'anim_fadeIn');
            (_c = this.menuNavbar) === null || _c === void 0 ? void 0 : _c.classList.add('anim_fadeOut');
            (_d = this.menuLogo) === null || _d === void 0 ? void 0 : _d.classList.remove('logo_menu_open');
            (_e = this.menuLeft) === null || _e === void 0 ? void 0 : _e.classList.remove('general_menu_open');
            (_f = this.menuLeft) === null || _f === void 0 ? void 0 : _f.classList.add('hidden');
            (_g = this.menuRight) === null || _g === void 0 ? void 0 : _g.classList.remove('general_menu_open', 'menu_right_open');
            if (this.menuLogo != undefined && this.menuOpener != undefined) {
                (_h = this.menuRight) === null || _h === void 0 ? void 0 : _h.insertAdjacentElement('beforeend', this.menuOpener);
                (_j = this.menuNavbar) === null || _j === void 0 ? void 0 : _j.insertAdjacentElement('afterbegin', this.menuLogo);
            }
        }
        else //if CLOSED, then OPEN
         {
            (_k = this.mainContentContainer) === null || _k === void 0 ? void 0 : _k.classList.add('div_center_menu_open');
            (_l = this.menuNavbar) === null || _l === void 0 ? void 0 : _l.classList.remove('anim_fadeOut');
            (_m = this.menuNavbar) === null || _m === void 0 ? void 0 : _m.classList.add('div_navbar_menu_open', 'anim_fadeIn');
            (_o = this.menuLogo) === null || _o === void 0 ? void 0 : _o.classList.add('logo_menu_open');
            (_p = this.menuLeft) === null || _p === void 0 ? void 0 : _p.classList.add('general_menu_open');
            (_q = this.menuRight) === null || _q === void 0 ? void 0 : _q.classList.add('general_menu_open', 'menu_right_open');
            (_r = this.menuLeft) === null || _r === void 0 ? void 0 : _r.classList.remove('hidden');
            if (this.menuLogo != undefined && this.menuOpener != undefined) {
                (_s = this.menuLeft) === null || _s === void 0 ? void 0 : _s.insertAdjacentElement('afterbegin', this.menuOpener);
                (_t = this.menuNavbar) === null || _t === void 0 ? void 0 : _t.insertAdjacentElement('beforeend', this.menuLogo);
            }
        }
        this.menuStatus = !this.menuStatus;
    }
}
//# sourceMappingURL=menu.js.map