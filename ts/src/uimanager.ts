import {ResponsiveManager}  from './responsive.js';
import {TouchSwipe}         from './touchswipe.js';
import {UserHandler}        from './userhandler.js';
import {Notification}       from './notifications.js';
import {Modal}              from './modal.js';
import {MapsManager}        from './mapsmanager.js';

export class UIManager {
  private responsive:       ResponsiveManager;
  private userhandler:      UserHandler;
  private notify:           Notification;
  private swipe:            TouchSwipe | undefined;
  private pageContainer:    HTMLElement | undefined | null;
  private modals:           Modal[] = [];

  constructor(...allmodals: Modal[]) 
  {
    let logged    = false as boolean;
    let tmp = sessionStorage.getItem('logged');
    if(tmp == 'true')
      logged = true;
    else
      logged = false;

    this.responsive = new ResponsiveManager(800, logged);
    this.notify = new Notification(allmodals, this.responsive.getContentContainer());
    this.userhandler = new UserHandler(this.responsive, this.notify, this.modals);

    this.pageContainer = this.responsive.getPageContainer();
    this.modals = this.notify.getModals();

    this.init();

    //INIT MAP
    let mapsman = new MapsManager();
  }

  /**
   * Initializes mobile responsiveness
   * Adds event listeners for modals
   **/
  private init() {
    //Responsiveness
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
        this.swipe?.start();
      }
    }
  /*Modals*/
    for (const modal of this.modals) {
      modal.onOpen(() => {
        if (modal.getState() === false) {
          //OPEN MODAL
          modal.openModal();
          modal.setState(true);
        }
      });

      modal.onClose(() => {
        if (modal.getState() === true) {
          //HANDLE TIMERS
          this.notify.clearCurModalMsgField();
          this.notify.clearTimers('modal');
          //CLOSE MODAL
          modal.closeModal();
          modal.setState(false);
        }
      });
    }
  }

  public submit_login()
  {
    this.userhandler.submit_login();
  }

  public submit_logout()
  {
    this.userhandler.submit_logout();
  }

  public submit_reg()
  {
    this.userhandler.submit_registration();
  }
}
