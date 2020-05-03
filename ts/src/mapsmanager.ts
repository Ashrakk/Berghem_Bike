import * as L from 'leaflet';

export class MapsManager {
  private map: L.Map | undefined | null;
  private mapDiv: HTMLElement | undefined | null;
  private mapBounds: L.LatLngBounds | undefined | null;
  private zoomLevel: number | undefined | null;

  constructor() {
    this.init();
  }

  private init() {
    this.mapDiv = document.getElementById('map');
    /*boundOne boundTwo zoomLevel should be retrieved by ajax call*/
    let boundOne = new L.LatLng(45.681539, 9.622572);
    let boundTwo = new L.LatLng(45.710315, 9.729688);
    this.zoomLevel = 14;
    this.mapBounds = new L.LatLngBounds(boundOne, boundTwo);
    
    /*CREATE MAP*/
    if (this.mapDiv != undefined) {
      this.map = new L.Map('map')
      this.map.fitBounds(this.mapBounds);
      this.map.setZoom(this.zoomLevel);
      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          minZoom: 13,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
            'pk.eyJ1IjoiZGF2aWRlY3VuaSIsImEiOiJjazllNXpxNDIwOWo1M2dxbHllaGFyNzZxIn0.PuLUAJcKKJ4q46wSH_PmAg',
        }
      ).addTo(this.map);

    }
  }

  /*
  function downloadUrl(url, callback) {
    var request = window.ActiveXObject ?
        new ActiveXObject('Microsoft.XMLHTTP') :
        new XMLHttpRequest;

    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        request.onreadystatechange = doNothing;
        callback(request, request.status);
      }
    };

    request.open('GET', url, true);
    request.send(null);
  }
  */
  /*
  function initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(-33.863276, 151.207977),
        zoom: 12
      });
      var infoWindow = new google.maps.InfoWindow;

        // Change this depending on the name of your PHP or XML file
        downloadUrl('https://storage.googleapis.com/mapsdevsite/json/mapmarkers2.xml', function(data) {
          var xml = data.responseXML;
          var markers = xml.documentElement.getElementsByTagName('marker');
          Array.prototype.forEach.call(markers, function(markerElem) {
            var id = markerElem.getAttribute('id');
            var name = markerElem.getAttribute('name');
            var address = markerElem.getAttribute('address');
            var type = markerElem.getAttribute('type');
            var point = new google.maps.LatLng(
                parseFloat(markerElem.getAttribute('lat')),
                parseFloat(markerElem.getAttribute('lng')));

            var infowincontent = document.createElement('div');
            var strong = document.createElement('strong');
            strong.textContent = name
            infowincontent.appendChild(strong);
            infowincontent.appendChild(document.createElement('br'));

            var text = document.createElement('text');
            text.textContent = address
            infowincontent.appendChild(text);
            var icon = customLabel[type] || {};
            var marker = new google.maps.Marker({
              map: map,
              position: point,
              label: icon.label
            });
            marker.addListener('click', function() {
              infoWindow.setContent(infowincontent);
              infoWindow.open(map, marker);
            });
          });
        });
      }
    */
}
