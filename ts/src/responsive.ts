export class ResponsiveManager {
  /*MENU STUFF*/

  private menuNavbar:           HTMLElement | undefined | null;
  private menuOpener:           HTMLElement | undefined | null;
  private menuOpenerContainer:  HTMLElement | undefined | null;
  private menuLogo:             HTMLElement | undefined | null;
  private menuLeft:             HTMLElement | undefined | null;
  private currentRightMenu:     HTMLElement | undefined | null;
  private menuRightDefault:     HTMLElement | undefined | null;
  private menuRightLogged:      HTMLElement | undefined | null;
  private menuStatus:           boolean; // TRUE = OPEN

  /*PAGE STUFF*/
  private pageContainer:        HTMLElement | undefined | null;
  private pageLoader:           HTMLElement | undefined | null;
  private mainContentContainer: HTMLElement;
  private allColumnsElements:   NodeListOf<Element> | undefined | null;
  private allRowElements:       NodeListOf<Element> | undefined | null;
  private shadowElements:       NodeListOf<Element> | undefined | null;
  private allColumnsOriginalClasses: string[] = [];
  
  /*MODAL (Resizing for responsiveness) */
  private modals: NodeListOf<Element> | undefined | null;

  /*VARIABLES*/
  private mobileWidth:      number;
  private mobileResponsive: boolean; // TRUE = MOBILE
  private mobileStatus:     boolean;

  public isMenuOpen(): boolean {
    return this.menuStatus;
  }
  public getMenuNavbar(): HTMLElement | undefined | null {
    return this.menuNavbar;
  }

  public getPageContainer(): HTMLElement | undefined | null {
    return this.pageContainer;
  }

  public getContentContainer(): HTMLElement {
    return this.mainContentContainer;
  }

  public getCurrentRightMenu(): HTMLElement | undefined | null {
    return this.currentRightMenu;
  }

  public isMobileResponsive(): boolean {
    return this.mobileResponsive;
  }

  public isMobileModeActive(): boolean {
    return this.mobileStatus;
  }

  constructor(width: number, menu_right_type: boolean) {
    this.mobileWidth = width;
    /*MENU STUFF*/
    this.menuNavbar           = document.getElementById('id-navbar');
    this.menuRightDefault     = document.getElementById('id-menu-right-default');
    this.menuRightLogged      = document.getElementById('id-menu-right-logged');
    this.menuLeft             = document.getElementById('id-menu-left');
    this.menuOpenerContainer  = document.getElementById('id-menu-right-dropdown-container');
    this.menuOpener           = document.getElementById('id-menu-right-dropdown');
    this.menuLogo             = document.getElementById('id-logo');
    this.menuStatus           = false;
    /*PAGE STUFF*/
    this.pageContainer        = document.getElementById('id-page-container');
    this.pageLoader           = document.getElementById('id-page-loader');
    this.allColumnsElements   = document.querySelectorAll(
      '.div_internal_column, .column_width_1e6, .column_width_1e5, .column_width_1e4, .column_width_1e3'
    );
    this.allRowElements       = document.querySelectorAll('.div_internal_row:not(.flexColumn)');
    this.shadowElements       = document.querySelectorAll('.boxshadow');
    this.mainContentContainer = document.getElementById('id-main-content-container') as HTMLElement;

    this.modals               = document.querySelectorAll('.modal_content');
    this.mobileResponsive     = false;
    this.mobileStatus         = false;

    this.init();
    this.switchMenuType(menu_right_type);

    //SHOW PAGE
    this.pageLoader?.classList.add('hidden');
    this.pageContainer?.classList.remove('hidden');
  }

  private init() {
    //save original column classes

    if (this.allColumnsElements != undefined) {
      for (let index = 0; index < this.allColumnsElements?.length; index++) {
        this.allColumnsOriginalClasses.push(
          this.allColumnsElements.item(index).classList.value
        );
      }
    }

    //Returns true if mobile
    this.mobileResponsive = this.mobileCheck();
    this.mobileStatus = false;

    //fix page
    this.handleResponsiveness();

    window.addEventListener('resize', (evt: any) => {
      this.handleResponsiveness();
    });
    window.addEventListener('pageshow', (evt: any) => {
      this.handleResponsiveness();
    });

    this.menuOpener?.addEventListener('click', () => {
      this.toggleMenu();
    });
  }

  private mobileCheck(): boolean {
    let isMobile = false;
    //THIS IS JUST A HUGE MACRO 
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        window.navigator.userAgent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        window.navigator.userAgent.substr(0, 4)
      )
    ) {
      isMobile = true;
    }
    return isMobile;
  }

  //toggle between mobile and desktop mode
  private mobileMode( status: boolean ) 
  {
    // MOBILE MODE
    if (status === true && status !== this.mobileStatus) 
    {
      if (
        this.allColumnsElements != undefined &&
        this.allRowElements != undefined &&
        this.shadowElements != undefined &&
        this.modals != undefined
      ) {
        for (let index = 0; index < this.allColumnsElements?.length; index++) {
          this.allColumnsElements
            .item(index)
            .classList.remove(
              'div_internal_column',
              'column_width_1e6',
              'column_width_1e5',
              'column_width_1e4',
              'column_width_1e3'
            );
          this.allColumnsElements.item(index).classList.add('paddingBottom20');
        }
        //ADD flexColumns TO Rows
        for (let index = 0; index < this.allRowElements?.length; index++) {
          this.allRowElements.item(index).classList.add('flexColumn');
        }
        //REMOVE boxshadow FROM shadowElements
        for (let index = 0; index < this.shadowElements?.length; index++) {
          this.shadowElements.item(index).classList.remove('boxshadow');
        }
        //ADD modal_content_mobile TO modals
        for (let index = 0; index < this.modals?.length; index++) {
          this.modals.item(index).classList.add('modal_content_mobile');
        }
      }
      this.mobileStatus = status;
    } 
    else if (status === false && status !== this.mobileStatus) 
    {
      // DESKTOP MODE
      this.menuOpener?.classList.remove('menu-right-dropdown-responsive');
      if (
        this.allColumnsElements != undefined &&
        this.allRowElements != undefined &&
        this.shadowElements != undefined &&
        this.modals != undefined
      ) {
        //RESTORE ORIGINAL CLASSES of Columns
        for (let index = 0; index < this.allColumnsElements?.length; index++) {
          this.allColumnsElements.item(index).classList.value = this.allColumnsOriginalClasses[index];
        }
        //ADD boxshadow TO shadowElements
        for (let index = 0; index < this.shadowElements?.length; index++) {
          this.shadowElements.item(index).classList.add('boxshadow');
        }
        //REMOVE FlexColumn FROM Rows
        for (let index = 0; index < this.allRowElements?.length; index++) {
          this.allRowElements.item(index).classList.remove('flexColumn');
        }
        //REMOVE modal_content_mobile FROM modals
        for (let index = 0; index < this.modals?.length; index++) {
          this.modals.item(index).classList.remove('modal_content_mobile');
        }
      }
      this.mobileStatus = status;
    }
  }

  //called by resize and reset window events
  private handleResponsiveness() 
  {
    const width = window.innerWidth;
    /*MOBILE MODE HANDLING*/
    if ((width < this.mobileWidth || this.mobileResponsive === true) &&
        this.mobileStatus === false)
    {
      this.mobileMode(true);
    } else if (
      width > this.mobileWidth &&
      this.mobileResponsive === false &&
      this.mobileStatus === true) 
    {
      this.mobileMode(false);
    }
    /*MENU HANDLING*/
    //case one (1)
    //width   <   mobileWidth   
    //      OR
    //mobileResponsive  === true (mobile browser)
    //      AND
    //menuStatus  === false (closed)
    if (
      (width < this.mobileWidth || this.mobileResponsive === true) &&
      this.menuStatus === false
    ) {
      this.menuLeft?.classList.add('hidden');
      this.currentRightMenu?.classList.add('hidden');
      this.menuOpenerContainer?.classList.remove('hidden');
      this.mainContentContainer?.classList.remove('div_center_menu_open');
    }
    //case two (2)
    //width   <   mobileWidth   
    //      OR
    //mobileResponsive  === true (mobile browser)
    //      AND
    //menuStatus  === false (open)
    if (
      (width < this.mobileWidth || this.mobileResponsive === true) &&
      this.menuStatus === true
    ) {
      this.menuLeft?.classList.remove('hidden');
      this.currentRightMenu?.classList.remove('hidden');
      this.mainContentContainer?.classList.add('div_center_menu_open');
    //case three (3)
    //width   >   mobileWidth   
    //      AND
    //mobileResponsive  === false (desktop browser)
    //      AND
    //menuStatus  === false (closed)
    } else if (
      width > this.mobileWidth &&
      this.mobileResponsive === false &&
      this.menuStatus === false
    ) {
      this.menuLeft?.classList.remove('hidden');
      this.currentRightMenu?.classList.remove('hidden');
      this.menuOpenerContainer?.classList.add('hidden');
      this.mainContentContainer?.classList.remove('div_center_menu_open');
    //case four (4)
    //width   >   mobileWidth   
    //      AND
    //mobileResponsive  === false (desktop browser)
    //      AND
    //menuStatus  === true (open)
    } else if (
      width > this.mobileWidth &&
      this.mobileResponsive === false &&
      this.menuStatus === true
    ) {
      this.menuLeft?.classList.remove('hidden');
      this.currentRightMenu?.classList.remove('hidden');
      this.menuOpenerContainer?.classList.add('hidden');
      this.toggleMenu();
    }
  }

  //MOBILE MENU OPEN/CLOSE
  public toggleMenu() {
    if (this.menuStatus === true) {
      //if OPEN, then CLOSE 
      this.mainContentContainer?.classList.remove('div_center_menu_open');
      this.menuNavbar?.classList.remove(
        'div_navbar_menu_open',
        'anim_menuFadeIn'
      );
      this.menuNavbar?.classList.add('anim_menuFadeOut');
      this.menuLeft?.classList.remove('general_menu_open');
      this.menuLeft?.classList.add('hidden');
      this.currentRightMenu?.classList.add('hidden');
      this.menuRightDefault?.classList.remove('general_menu_open', 'menu_right_open');
      this.menuRightLogged?.classList.remove('general_menu_open', 'menu_right_open');

      if (this.menuLogo != undefined && this.menuOpener != undefined) {
        this.menuOpenerContainer?.insertAdjacentElement(
          'beforeend',
          this.menuOpener
        );
        this.menuNavbar?.insertAdjacentElement('afterbegin', this.menuLogo);
      }
      this.menuOpener?.classList.remove('menu-right-dropdown-responsive');
    } //if CLOSED, then OPEN
    else {
      this.mainContentContainer?.classList.add('div_center_menu_open');
      this.menuNavbar?.classList.remove('anim_menuFadeOut');
      this.menuNavbar?.classList.add('div_navbar_menu_open', 'anim_menuFadeIn');
      this.menuLeft?.classList.add('general_menu_open');
      this.menuRightDefault?.classList.add('general_menu_open', 'menu_right_open');
      this.menuRightLogged?.classList.add('general_menu_open', 'menu_right_open');
      this.menuLeft?.classList.remove('hidden');
      this.currentRightMenu?.classList.remove('hidden');

      if (this.menuLogo != undefined && this.menuOpener != undefined) {
        this.menuLeft?.insertAdjacentElement('afterbegin', this.menuOpener);
        this.menuNavbar?.insertAdjacentElement('beforeend', this.menuLogo);
      }
      this.menuOpener?.classList.add('menu-right-dropdown-responsive');
    }
    this.menuStatus = !this.menuStatus; //TOGGLE
  }

  /**
   * Changes the menu based on the user logged in status
   * @param menu_type IF = true: Logged in view IF = false: Default view
   */
  public switchMenuType(menu_type: boolean)
  {
    if(menu_type == true) //LOGGED IN VIEW
    {
      this.currentRightMenu = this.menuRightLogged;
      this.menuRightDefault?.classList.add('hidden');
    }
    if(menu_type == false) //DEFAULT VIEW
    {
      this.currentRightMenu = this.menuRightDefault;
      this.menuRightLogged?.classList.add('hidden');
    }
    
    this.currentRightMenu?.classList.remove('hidden');
    this.handleResponsiveness();
  }
}
