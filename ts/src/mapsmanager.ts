import * as L from 'leaflet';
import { AjaxManager }  from './ajaxmanager.js';

class CustomMarker
{
  private icon: L.Icon | undefined;
  public getIcon() { return this.icon as L.Icon<L.IconOptions>; }

  constructor(path: string)
  {
    if(path != undefined)
    {
      if(path != '')
      {
        this.icon = L.icon(
          {
            iconUrl:      path,
            iconSize:     [20, 35],
            iconAnchor:   [10, 35],
            popupAnchor:  [0, -35]
          });
      }
    }
  }
};

export class MapsManager {
  private map: L.Map | undefined | null;
  private mapDiv: HTMLElement | undefined | null;
  private mapBounds: L.LatLngBounds | undefined | null;
  private zoomLevel: number | undefined | null;

  private markerGreen:  CustomMarker;
  private markerYellow: CustomMarker;
  private markerRed:    CustomMarker;

  private markers: L.Marker[] = [];

  private ajaxman: AjaxManager;

  constructor() 
  {
    this.mapDiv = document.getElementById('map');
    /*boundOne boundTwo zoomLevel should be retrieved by ajax call*/
    let boundOne = new L.LatLng(45.681539, 9.622572);
    let boundTwo = new L.LatLng(45.710315, 9.729688);
    this.zoomLevel = 13;
    this.mapBounds = new L.LatLngBounds(boundOne, boundTwo);

    this.markerGreen  = new CustomMarker('./images/common/map-marker-green.svg');
    this.markerYellow = new CustomMarker('./images/common/map-marker-orange.svg');
    this.markerRed    = new CustomMarker('./images/common/map-marker-red.svg');

    this.ajaxman = new AjaxManager();

    this.init();
  }

  private init()
  {
    /*CREATE MAP*/
    if (this.mapDiv     != undefined &&
        this.mapBounds  != undefined &&
        this.zoomLevel  != undefined) 
    {
      this.map = new L.Map('map')
      this.map.fitBounds(this.mapBounds);
      this.map.setMaxBounds(this.mapBounds);
      this.map.setZoom(this.zoomLevel);
      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 16,
          minZoom: 13,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
            'pk.eyJ1IjoiZGF2aWRlY3VuaSIsImEiOiJjazllNXpxNDIwOWo1M2dxbHllaGFyNzZxIn0.PuLUAJcKKJ4q46wSH_PmAg',
        }
      ).addTo(this.map);
    }

    this.reload(false);
  }

  public reload(adv: boolean)
  {
    this.ajaxman.ajax_getMapMarkers((xmlRequest: XMLHttpRequest) => 
    {
      let xml = xmlRequest.responseXML;
      let stations = xml?.documentElement.getElementsByTagName('Station');
      let icon:   L.Icon;
      let marker: L.Marker;
      let popup:  L.Popup;
      let IDStation;
      let lat;
      let lon;
      let slots;
      let available;
      let name;
      let addr;

      if(stations != undefined &&
        this.map != undefined)
      {
        for(let index = 0; index < stations?.length; index++ )
        {
          IDStation = stations?.item(index)?.getElementsByTagName('idst').item(0)?.innerHTML;
          lat       = parseFloat(stations?.item(index)?.getElementsByTagName('lat').item(0)?.innerHTML       as string);
          lon       = parseFloat(stations?.item(index)?.getElementsByTagName('lon').item(0)?.innerHTML       as string);
          slots     = parseFloat(stations?.item(index)?.getElementsByTagName('slots').item(0)?.innerHTML     as string);
          available = parseFloat(stations?.item(index)?.getElementsByTagName('available').item(0)?.innerHTML as string);
          name      = stations?.item(index)?.getElementsByTagName('name').item(0)?.innerHTML;
          addr      = stations?.item(index)?.getElementsByTagName('addr').item(0)?.innerHTML;

          popup   = new L.Popup().setContent(`${name}<br>${addr}<br>Slot: ${available}/${slots}`);
          
          if(available < (slots * (1/3) ))
          {
            //RED MARKER
            icon = this.markerRed.getIcon();
          }
          else if (available < (slots * (1/2) ))
          {
            //YELLOW MARKER
            icon = this.markerYellow.getIcon();
          }
          else
          {
            //GREEN MARKER         
            icon = this.markerGreen.getIcon();
          }

          marker  = new L.Marker([lat, lon], {icon: icon}).bindPopup(popup).openPopup();
          marker.addTo(this.map);
          this.markers.push(marker);
        }
      }

    });
  }
}
