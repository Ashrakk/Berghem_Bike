export class Modal {
  private openButton:     HTMLElement | undefined | null;
  private closeButton:    HTMLElement | undefined | null;
  private modalContainer: HTMLElement | undefined | null;
  private modalContent:   HTMLElement | undefined | null;
  private modalMessage:   HTMLElement | undefined | null;
  private modalInputs:    NodeListOf<HTMLInputElement> | undefined | null;
  private openState:      boolean;

  public getCloseButton():   HTMLElement {return this.closeButton as HTMLElement;}
  public getModalMessage():  HTMLElement {return this.modalMessage as HTMLElement;}
  public getState():     boolean  {return this.openState;}
  public setState(state: boolean) { this.openState = state;}
  
  constructor(modal_id: string, open_button_id: string) {

    this.openState = false;
    this.modalContainer = document.getElementById(modal_id);
    this.closeButton = this.modalContainer?.querySelector('.modal_button_close');
    this.modalContent = this.modalContainer?.querySelector('.modal_content');
    this.modalMessage = this.modalContainer?.querySelector('.modal_message');
    this.modalInputs = this.modalContainer?.querySelectorAll('input');

    this.openButton = document.getElementById(open_button_id);

    if (
      this.openButton != undefined &&
      this.closeButton != undefined &&
      this.modalContainer != undefined
    ) {
      this.init();
    }
  }

  private init() {
    this.openButton?.addEventListener('click', () => {
      this.onOpen();
    });
    this.closeButton?.addEventListener('click', () => {
      this.onClose();
    });
    /*PREVENT EVENT PROPAGATION WHEN CLICKING INSIDE THE MODAL*/
    this.modalContent?.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    });
    /*CLOSE MODAL BY CLICKING OUTSIDE*/
    this.modalContainer?.addEventListener('click', () => {
      //Clean all inputs then call callback
      if(this.modalInputs != undefined)
      for (let index = 0; index < this.modalInputs?.length; index++) 
      {
        this.modalInputs.item(index).value = "";
      };
      this.onClose();
    });
  }

  public onOpen(callback?: () => void): void {
    if (callback != undefined) this.onOpen = callback;
  }

  public onClose(callback?: () => void): void {
    if (callback != undefined) this.onClose = callback;
  }

  public openModal() {
    this.modalContainer?.classList.remove('hidden');
  }

  public closeModal() {
    this.modalContainer?.classList.add('hidden');
  }
}
