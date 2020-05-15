import {Modal} from './modal.js';

export class Notification
{
    private boxTimers:        number[] | undefined;
    private modalTimers:      number[] | undefined;
    private modals:           Modal[] = [];
    private msgBox:           HTMLElement | undefined | null;
    private contentContainer: HTMLElement | undefined | null;

    public getModals()                    { return this.modals; };


    constructor(allmodals: Modal[], tmpContainer: HTMLElement)
    {
        this.boxTimers        = new Array<number>();
        this.modalTimers      = new Array<number>();
        this.modals           = allmodals;
        this.contentContainer = tmpContainer;
        this.msgBox           = document.getElementById('messageBox');
    }

 /**
  * Display timed desktop mode notification
  * @param str 
  */
    public showMessageBox( str: string )
    {
      let tmpTimer;

      this.clearTimers('box');
      this.clearMsgBox();
  
      if(str != undefined &&
        this.msgBox != undefined)
      {
        this.msgBox.innerHTML = str;
        this.contentContainer?.classList.add("div_center_messageShow")
        this.msgBox.classList.add("messageBoxAfter");
        this.msgBox.classList.add("anim_fadeIn");
        this.msgBox.classList.remove("hidden");
        this.closeCurrentModal();
  
        tmpTimer = setTimeout(() => {
          if(this.msgBox != undefined)
          {
            this.msgBox.classList.remove("anim_fadeIn");
            this.msgBox.classList.add("anim_fadeOut");
          }
        }, 5000)
  
        this.boxTimers?.push(tmpTimer);
        
        tmpTimer = setTimeout(() => {
          if(this.msgBox != undefined)
          {
            this.msgBox.classList.add("hidden");
            this.msgBox.classList.remove("anim_fadeOut");
            this.msgBox.classList.remove("messageBoxAfter");
            this.contentContainer?.classList.remove("div_center_messageShow")
            this.msgBox.innerHTML = "";
            this.boxTimers = [];
          }
        }, 5300)
  
        this.boxTimers?.push(tmpTimer);
      }
    }

    /**
     * Clears the desktop mode notification 
     */
    public clearMsgBox()
    {
      if(this.msgBox != undefined)
      {
        this.msgBox.classList.add("hidden");
        this.msgBox.classList.remove("anim_fadeOut");
        this.msgBox.classList.remove("messageBoxAfter");
        this.contentContainer?.classList.remove("div_center_messageShow")
        this.msgBox.innerHTML = "";
      }
    }


    /**
     * Display notification on current modal 
     * @param str message
     * @param color Valid inputs: false (red) OR true (green)  
     * @param closemodal true to set timer to close modal
     */
    public showCurModalMsgField( str: string, color: boolean, closemodal: boolean) 
    {
      let state = false;
      var tmpTimer;
      var modalMsg: HTMLElement;
      var str_color: string;

      this.clearTimers('modal');
      this.clearCurModalMsgField();

      if(color == false)
        str_color = 'messageRed';
      else
        str_color = 'messageGreen';
      
      let modal = this.getOpenModal();
      if(modal != undefined)
      {
        modalMsg = modal.getModalMessage();

        if(modalMsg != undefined)
        {
          modalMsg.innerHTML = str;
          modalMsg.classList.add(str_color)
          modalMsg.classList.add("modal_message_open");
          modalMsg.classList.add("anim_fadeIn");
          modalMsg.classList.remove("hidden");

          tmpTimer = setTimeout(() => {
            if(modalMsg != undefined)
            {
              modalMsg.classList.remove("anim_fadeIn");
              modalMsg.classList.add("anim_fadeOut");
            }
          }, 5000)

          this.modalTimers?.push(tmpTimer);

          tmpTimer = setTimeout(() => {
              modalMsg.classList.add("hidden");
              modalMsg.classList.remove("anim_fadeOut");
              modalMsg.classList.remove("modal_message_open");
              modalMsg.classList.remove(str_color);
              modalMsg.innerHTML = "";
              if(closemodal == true)
                this.closeCurrentModal();
              this.modalTimers = [];
          }, 5300)

          this.modalTimers?.push(tmpTimer);
        }
      }
    }
  
    /**
     * Clear current modal notification
     */
    public clearCurModalMsgField()
    {
      let modal = this.getOpenModal();
      if(modal != undefined)
      {
        let msg = modal.getModalMessage();
        msg.classList.add("hidden");
        msg.classList.remove("messageRed", "messageGreen", "anim_fadeOut", "anim_fadeIn", "modal_message_open");
        msg.innerHTML = "";
      }
    }

    /**
     * Closes current modal
     */
    public closeCurrentModal()
    {
      let modal = this.getOpenModal();
      if(modal != undefined)
        modal.getCloseButton().click();
    }

    /**
     * Gets open modal
     */
    public getOpenModal(): Modal | undefined
    {
      let state = false;
      for (const modal of this.modals)
      {
        state = modal.getState();
        if(state == true)
          return modal;
      }
      return undefined;
    }

    /**
     * Clears all the timers (set to close modals or notifications)
     * Used when manually cleaning notifications
     * @param str valid values: 'modal' or 'box'
     */
    public clearTimers(str: String)
    {
      let timers;
      if(str == 'modal')
        timers = this.modalTimers;
      else if (str == 'box')
        timers = this.boxTimers;
      else
        return;

      if(timers != undefined)
      {
        for(let index = 0, len = timers.length; index < len; index++)
        {
          clearTimeout(timers[index]);
        }
      }
    }
  
}