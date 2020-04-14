import { ResponsiveManager } from './responsive.js';
import { Modal } from './modal.js';

export class UIManager
{
    responsive: ResponsiveManager;
    modals: Modal[] = [];
    modalState: boolean;
    

    constructor(...allmodals: Modal[])
    {
        this.responsive = new ResponsiveManager();
        this.modals = allmodals;
        this.modalState = false;

        this.init();
    }

    private init()
    {
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