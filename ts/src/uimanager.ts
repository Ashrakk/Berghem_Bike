import { ResponsiveManager } from './responsive.js';
import { TouchSwipe } from './touchswipe.js';
import { Modal } from './modal.js';

export class UIManager
{
    responsive: ResponsiveManager;
    modals: Modal[] = [];
    modalState: boolean;
    pageContainer: HTMLElement | undefined | null;
    swipe: TouchSwipe | undefined;

    constructor(...allmodals: Modal[])
    {
        this.responsive = new ResponsiveManager();
        this.pageContainer = this.responsive.getPageContainer();

        this.modals = allmodals;
        this.modalState = false;

        this.init();
    }

    private init()
    {
        if(this.pageContainer != undefined)
        {
            const mobile = this.responsive.isMobileResponsive();
            if(mobile === true)
            {
                this.swipe = new TouchSwipe(this.pageContainer, 10);
                this.swipe.onRight( () => {
                    const mobileStatus = this.responsive.isMobileModeActive();
                    const menuStatus = this.responsive.isMenuOpen();
                    if (mobileStatus === true && menuStatus === true)
                    {
                        this.responsive.toggleMenu();
                    }
                });
                this.swipe.onLeft( () => {
                    const mobileStatus = this.responsive.isMobileModeActive();
                    const menuStatus = this.responsive.isMenuOpen();
                    if (mobileStatus === true && menuStatus === false)
                    {
                        this.responsive.toggleMenu();
                    }
                });
                this.swipe?.start();
            }
        }

        for (const modal of this.modals) {
            modal.onOpen(() => 
            {
                if(this.modalState === false) //OPEN MODAL
                {
                    modal.openModal();
                    this.modalState = true;
                }
            })

            modal.onClose(() => 
            {
                if(this.modalState === true) //CLOSE MODAL
                {
                    modal.closeModal();
                    this.modalState = false;
                }
            })     
        }

        
    }
}