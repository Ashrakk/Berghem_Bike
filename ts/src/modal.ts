export class Modal
{
    private openButton: HTMLElement | undefined | null;
    private closeButton: HTMLElement | undefined | null;
    private modalContainer: HTMLElement | undefined | null;
    private modalContent: HTMLElement | undefined | null;

    constructor(modal_id: string, open_id: string)
    {
        this.modalContainer = document.getElementById(modal_id);
        this.closeButton = this.modalContainer?.querySelector('.modal_button_close');
        this.modalContent = this.modalContainer?.querySelector('.modal_content');
        this.openButton = document.getElementById(open_id);

        if( this.openButton != undefined &&
            this.closeButton != undefined &&
            this.modalContainer != undefined)
        {
            this.init();
        }
    }

    private init()
    {
        this.openButton?.addEventListener('click', () => {
            this.onOpen();
        });
        this.closeButton?.addEventListener('click', () => {
            this.onClose();
        });
        /*PREVENT EVENT PROPAGATION WHEN CLICKING INSIDE THE MODAL*/
        this.modalContent?.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        });
        /*CLOSE MODAL BY CLICKING OUTSIDE*/
        this.modalContainer?.addEventListener('click', () => {
            this.onClose();
        });
    }

    public onOpen(callback?: () => void): void {
        if (callback != undefined) this.onOpen = callback;
    }

    public onClose(callback?: () => void): void {
        if (callback != undefined) this.onClose = callback;
    }

    public openModal()
    {
        this.modalContainer?.classList.remove('hidden');
    }

    public closeModal()
    {
        this.modalContainer?.classList.add('hidden');
    }
}