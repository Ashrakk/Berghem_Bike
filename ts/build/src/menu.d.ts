export declare class MenuManager {
  menuNavbar: HTMLElement | undefined | null;
  menuOpener: HTMLElement | undefined | null;
  menuLogo: HTMLElement | undefined | null;
  menuLeft: HTMLElement | undefined | null;
  menuRight: HTMLElement | undefined | null;
  mainContentContainer: HTMLElement | undefined | null;
  menuStatus: boolean;
  constructor();
  private handleMenuResponsiveness;
  private handleMenuButton;
}
