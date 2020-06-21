import { AjaxManager }          from './ajaxmanager.js';
import { Notification }         from './notifications.js';
import { Constants }            from './constants.js';
import { UserHandler }          from './userhandler.js';

export class DashManager
{
    private ajaxman:            AjaxManager;
    private notify:             Notification;
    private usermanager:        UserHandler;

    //DASHBOARD BUTTONS
    private buttOverview:     HTMLElement | undefined | null;
    private buttAccount:      HTMLElement | undefined | null;
    private buttBilling:      HTMLElement | undefined | null;
    private buttActivity:     HTMLElement | undefined | null;
    private buttManagement:   HTMLElement | undefined | null;
    private dashContainer:    HTMLElement | undefined | null;

    /*DASHBOARD BROWSE BY PAGE*/
    private tableBody:        HTMLElement | undefined | null;
    private buttPageBack:     HTMLElement | undefined | null;
    private buttPageForward:  HTMLElement | undefined | null;
    private pageCountElem:    HTMLElement | undefined | null;
    private currentPageElem:  HTMLElement | undefined | null;
    private pageCount   = 1;
    private currentPage = 1;

    /*ADMIN MANAGEMENT HANDLER*/
    private buttStations:   HTMLElement | undefined | null;
    private buttBikes:      HTMLElement | undefined | null;
    private buttUsers:      HTMLElement | undefined | null;

    constructor(tmpUserManager: UserHandler, tmpNotify: Notification)
    {
        this.notify      = tmpNotify;
        this.usermanager = tmpUserManager;
        this.ajaxman     = new AjaxManager(); 

        this.buttOverview     = document.getElementById('id-butt-overview');
        this.buttAccount      = document.getElementById('id-butt-account');
        this.buttBilling      = document.getElementById('id-butt-billing');
        this.buttActivity     = document.getElementById('id-butt-activity');
        this.buttManagement   = document.getElementById('id-butt-management');
        this.dashContainer    = document.getElementById('dash_container');

        if(this.dashContainer != undefined)
        {
          this.buttOverview?.addEventListener('click', () => {
            this.dashRequest(Constants.REQUEST_OVERVIEW);
          });
  
          this.buttAccount?.addEventListener('click', () => {
            this.dashRequest(Constants.REQUEST_ACCOUNT_DETAILS);
          });
  
          this.buttBilling?.addEventListener('click', () => {
            this.dashRequest(Constants.REQUEST_BILLING_DETAILS);
          });
  
          this.buttActivity?.addEventListener('click', () => {
            this.handlePageBrowsing(
            Constants.REQUEST_ACTIVITY_DETAILS,
            this.dashContainer,
            (x: number) => 
            {
              this.handleActivities(x);
            })
          });
  
          this.buttManagement?.addEventListener('click', () => {
            this.dashRequest(
              Constants.REQUEST_ADMIN_MANAGEMENT,
              this.dashContainer,
              () => 
              {
                this.buttStations = document.getElementById('id-butt-manage-stations');
                this.buttBikes    = document.getElementById('id-butt-manage-bikes');
                this.buttUsers    = document.getElementById('id-butt-manage-users');
                let manageContainer  = document.getElementById('management-container');
  
                this.buttStations?.addEventListener('click', () =>
                {
                  this.handlePageBrowsing(
                  Constants.REQUEST_ADMIN_MANAGE_STATIONS,
                  manageContainer,
                  (x: number) => 
                  {
                    this.handleManageStations(x);
                  })
                });
                
                this.buttBikes?.addEventListener('click', () =>
                {
                  this.handlePageBrowsing(
                  Constants.REQUEST_ADMIN_MANAGE_BIKES,
                  manageContainer,
                  (x: number) => 
                  {
                    this.handleManageBikes(x);
                  })              
                });
  
                this.buttUsers?.addEventListener('click', () =>
                {
                  this.handlePageBrowsing(
                  Constants.REQUEST_ADMIN_MANAGE_USERS,
                  manageContainer,
                  (x: number) => 
                  {
                    this.handleManageUsers(x);
                  })               
                });
  
              });
          });
  
          this.dashRequest(Constants.REQUEST_OVERVIEW);
  
          //CHECK ADMIN
          if(sessionStorage.getItem('admin') == 'true')
            this.buttManagement?.classList.remove('hidden');
          else
          this.ajaxman?.ajax_custom_request(
            Constants.CHECK_PRIVILEGE_STATUS,
            (xmlRequest: XMLHttpRequest) => 
            {
              let result = xmlRequest.responseText;
              if(result === Constants.SUCCESS) //admin mode
              {
                this.buttManagement?.classList.remove('hidden');
                sessionStorage.setItem('admin', 'true');
              }
            });
        }
    }

    private handleActivities(page: number)
    {
        let date;
        let origin;
        let dest;
        let duration;
        let distance;

        let tables = "";

        if(this.tableBody != undefined)
          this.tableBody.innerHTML = `
          <div style="padding: 6em 0em;">
            <img class="loader_dashboard" src="images/common/load1.gif">
          </div>
          `;

        this.ajaxman?.ajax_custom_request(
            Constants.REQUEST_QUERY_ACTIVITY + page,
            (xmlRequest: XMLHttpRequest) => 
            {
                let text = xmlRequest.responseText;

                if (text === Constants.NOT_LOGGED_IN)
                {
                  this.notify?.showMessageBox(false,"Non hai ancora eseguito l'accesso");
                  this.usermanager?.submit_logout();
                }
                else if (text === Constants.SESSION_EXPIRED)
                {
                  this.notify?.showMessageBox(false,"La sessione è scaduta");
                  this.usermanager?.submit_logout();
                }
                else
                {
                  let xml = xmlRequest.responseXML;
                  let activities = xml?.documentElement.getElementsByTagName('activity');
  
                  if(activities != undefined  &&
                      this.tableBody != undefined)
                  {
                      for(let index = 0; index < activities?.length; index++ )
                      {
                          date    = activities?.item(index)?.getElementsByTagName('date').item(0)?.innerHTML;
                          origin  = activities?.item(index)?.getElementsByTagName('origin').item(0)?.innerHTML;
                          dest    = activities?.item(index)?.getElementsByTagName('destination').item(0)?.innerHTML;
                          duration = activities?.item(index)?.getElementsByTagName('duration').item(0)?.innerHTML;
                          distance = activities?.item(index)?.getElementsByTagName('distance').item(0)?.innerHTML + "km";
  
                          tables = tables + `
                              <div class = "dash_table_row">
                                  <div class = "dash_table_cell">
                                      ${ date }
                                  </div>
                                  <div class = "dash_table_cell">
                                      ${ origin }
                                  </div>
                                  <div class = "dash_table_cell">
                                      ${ dest }
                                  </div>
                                  <div class = "dash_table_cell">
                                      ${ duration }
                                  </div>
                                  <div class = "dash_table_cell">
                                      ${ distance }
                                  </div>
                              </div>
                          `
                      }
                      this.tableBody.innerHTML = tables;
                  }
                }
            });
    }

    private handleEditAccount()
    {

    }

    private handleManageStations(page: number)
    {
      let IDStation;
      let lat;
      let lon;
      let slots;
      let available;
      let name;
      let addr;

      let tables = "";

      if(this.tableBody != undefined)
        this.tableBody.innerHTML = `
        <div style="padding: 6em 0em;">
          <img class="loader_dashboard" src="images/common/load1.gif">
        </div>
        `;

        this.ajaxman?.ajax_custom_request(
          Constants.REQUEST_ADMIN_QUERY_STATIONS + page,
          (xmlRequest: XMLHttpRequest) => 
          {
            let text = xmlRequest.responseText;

            if (text === Constants.NOT_LOGGED_IN)
            {
              this.notify?.showMessageBox(false,"Non hai ancora eseguito l'accesso");
              this.usermanager?.submit_logout();
            }
            else if (text === Constants.SESSION_EXPIRED)
            {
              this.notify?.showMessageBox(false,"La sessione è scaduta");
              this.usermanager?.submit_logout();
            }
            else
            {
              let xml = xmlRequest.responseXML;
              let stations = xml?.documentElement.getElementsByTagName('Station');

              if(stations != undefined  &&
                  this.tableBody != undefined)
              {
                for(let index = 0; index < stations?.length; index++ )
                {
                  IDStation = stations?.item(index)?.getElementsByTagName('idst').item(0)?.innerHTML;
                  slots     = parseFloat(stations?.item(index)?.getElementsByTagName('slots').item(0)?.innerHTML     as string);
                  available = parseFloat(stations?.item(index)?.getElementsByTagName('available').item(0)?.innerHTML as string);
                  name      = stations?.item(index)?.getElementsByTagName('name').item(0)?.innerHTML;
                  addr      = stations?.item(index)?.getElementsByTagName('addr').item(0)?.innerHTML;
                    
                  tables = tables + `
                    <div class = "dash_table_row">
                      <div class = "dash_table_cell">
                          ${ IDStation }
                      </div>
                      <div class = "dash_table_cell">
                          ${ name }
                      </div>
                      <div class = "dash_table_cell">
                          ${ addr }
                      </div>
                      <div class = "dash_table_cell">
                          ${ slots }
                      </div>
                      <div class = "dash_table_cell">
                          ${ available }
                      </div>
                    </div>
                    `
                }
                this.tableBody.innerHTML = tables;
              }
            }
          });
    }

    private handleManageBikes(page: number)
    {

    }

    private handleManageUsers(page: number)
    {

    }

    private handlePageBrowsing(requestType: any, container: HTMLElement | undefined | null = this.dashContainer, callback: Function)
    {
      this.dashRequest(requestType, container, () => 
      {
        this.buttPageForward  = document.getElementById('id-butt-pageForward');
        this.buttPageBack     = document.getElementById('id-butt-pageBack');
        this.pageCountElem    = document.getElementById('page-count');
        this.currentPageElem  = document.getElementById('page-current');        
        this.tableBody        = document.getElementById('table_body');        
        this.pageCount        = Number(this.pageCountElem?.innerText);
        this.currentPage      = 1;
  
        /*ACTIVE - NOT ACTIVE BUTT VISUAL EFFECT*/
  
        if(this.pageCount == this.currentPage)
        this.buttPageForward?.classList.add('not_active');
  
        this.buttPageBack?.classList.add('not_active');
  
        if(!isNaN(this.pageCount))
        {
            this.buttPageForward?.addEventListener('click', () =>
            {
                if(this.currentPage < this.pageCount)
                {
                    this.currentPage = this.currentPage + 1;
  
                    this.buttPageBack?.classList.remove('not_active');
  
                    if(this.pageCount == this.currentPage)
                      this.buttPageForward?.classList.add('not_active');
  
                    callback(this.currentPage);
                    if(this.currentPageElem != undefined)
                        this.currentPageElem.innerText = `${this.currentPage}`;
  
                }
            });
            this.buttPageBack?.addEventListener('click', () =>
            {
                if(1 < this.currentPage)
                {
                    this.currentPage = this.currentPage - 1;
  
                    this.buttPageForward?.classList.remove('not_active');
  
                    if(this.currentPage == 1)
                      this.buttPageBack?.classList.add('not_active');
  
                    callback(this.currentPage);
                    if(this.currentPageElem != undefined)
                        this.currentPageElem.innerText = `${this.currentPage}`;
                }
            });
            callback(0);
        }
      });
    }

    private dashRequest(requestType: string, container: HTMLElement | undefined | null = this.dashContainer, callback?: Function)
    {
      this.ajaxman?.ajax_custom_request(
        requestType,
        (xmlRequest: XMLHttpRequest) => 
        {
          let text = xmlRequest.responseText;

          if( container != undefined)
          {
            if(text === Constants.USER_NOT_VERIFIED)
            {
              this.notify?.showMessageBox(false,"Prima di continuare, controlla la tua casella di posta e verifica il tuo account");
              container.classList.add('hidden');
              container.innerHTML = '';
            }
              else if (text === Constants.NOT_LOGGED_IN)
            {
              this.notify?.showMessageBox(false,"Non hai ancora eseguito l'accesso");
              container.classList.add('hidden');
              container.innerHTML = '';
              this.usermanager?.submit_logout();
            }
            else if (text === Constants.SESSION_EXPIRED)
            {
              this.notify?.showMessageBox(false,"La sessione è scaduta");
              container.classList.add('hidden');
              container.innerHTML = '';
              this.usermanager?.submit_logout();
            }
            else
            {
              container.classList.remove('hidden');
              container.innerHTML = text;
                
              if(callback != undefined)
                callback();
            }
          }
        });
    }
}