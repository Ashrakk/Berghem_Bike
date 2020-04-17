export declare class ResponsiveManager {
    private menuNavbar;
    private menuOpener;
    private menuOpenerContainer;
    private menuLogo;
    private menuLeft;
    private menuRight;
    private menuStatus;
    isMenuOpen(): boolean;
    getMenuNavbar(): HTMLElement | undefined | null;
    private pageContainer;
    private pageLoader;
    private mainContentContainer;
    private allColumnsElements;
    private allRowElements;
    private allColumnsOriginalClasses;
    getPageContainer(): HTMLElement | undefined | null;
    private modals;
    private mobileResponsive;
    private mobileStatus;
    isMobileResponsive(): boolean;
    isMobileModeActive(): boolean;
    constructor();
    private init;
    private mobileCheck;
    private mobileMode;
    private handleResponsiveness;
    toggleMenu(): void;
}
