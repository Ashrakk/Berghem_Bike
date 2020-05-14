import * as L from 'leaflet';
import { AjaxManager } from './ajaxmanager.js';
class CustomMarker {
    constructor(path) {
        if (path != undefined) {
            if (path != '') {
                this.icon = L.icon({
                    iconUrl: path,
                    iconSize: [20, 35],
                    iconAnchor: [10, 35],
                    popupAnchor: [0, -35]
                });
            }
        }
    }
    getIcon() { return this.icon; }
}
;
export class MapsManager {
    constructor() {
        this.markers = [];
        this.mapDiv = document.getElementById('map');
        let boundOne = new L.LatLng(45.681539, 9.622572);
        let boundTwo = new L.LatLng(45.710315, 9.729688);
        this.zoomLevel = 13;
        this.mapBounds = new L.LatLngBounds(boundOne, boundTwo);
        this.markerGreen = new CustomMarker('./images/common/map-marker-green.svg');
        this.markerYellow = new CustomMarker('./images/common/map-marker-orange.svg');
        this.markerRed = new CustomMarker('./images/common/map-marker-red.svg');
        this.ajaxman = new AjaxManager();
        this.init();
    }
    init() {
        if (this.mapDiv != undefined &&
            this.mapBounds != undefined &&
            this.zoomLevel != undefined) {
            this.map = new L.Map('map');
            this.map.fitBounds(this.mapBounds);
            this.map.setMaxBounds(this.mapBounds);
            this.map.setZoom(this.zoomLevel);
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 16,
                minZoom: 13,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1IjoiZGF2aWRlY3VuaSIsImEiOiJjazllNXpxNDIwOWo1M2dxbHllaGFyNzZxIn0.PuLUAJcKKJ4q46wSH_PmAg',
            }).addTo(this.map);
        }
        this.reload(false);
    }
    reload(adv) {
        this.ajaxman.ajax_getMapMarkers((xmlRequest) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
            let xml = xmlRequest.responseXML;
            let stations = xml === null || xml === void 0 ? void 0 : xml.documentElement.getElementsByTagName('Station');
            let icon;
            let marker;
            let popup;
            let IDStation;
            let lat;
            let lon;
            let slots;
            let available;
            let name;
            let addr;
            if (stations != undefined &&
                this.map != undefined) {
                for (let index = 0; index < (stations === null || stations === void 0 ? void 0 : stations.length); index++) {
                    IDStation = (_b = (_a = stations === null || stations === void 0 ? void 0 : stations.item(index)) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('idst').item(0)) === null || _b === void 0 ? void 0 : _b.innerHTML;
                    lat = parseFloat((_d = (_c = stations === null || stations === void 0 ? void 0 : stations.item(index)) === null || _c === void 0 ? void 0 : _c.getElementsByTagName('lat').item(0)) === null || _d === void 0 ? void 0 : _d.innerHTML);
                    lon = parseFloat((_f = (_e = stations === null || stations === void 0 ? void 0 : stations.item(index)) === null || _e === void 0 ? void 0 : _e.getElementsByTagName('lon').item(0)) === null || _f === void 0 ? void 0 : _f.innerHTML);
                    slots = parseFloat((_h = (_g = stations === null || stations === void 0 ? void 0 : stations.item(index)) === null || _g === void 0 ? void 0 : _g.getElementsByTagName('slots').item(0)) === null || _h === void 0 ? void 0 : _h.innerHTML);
                    available = parseFloat((_k = (_j = stations === null || stations === void 0 ? void 0 : stations.item(index)) === null || _j === void 0 ? void 0 : _j.getElementsByTagName('available').item(0)) === null || _k === void 0 ? void 0 : _k.innerHTML);
                    name = (_m = (_l = stations === null || stations === void 0 ? void 0 : stations.item(index)) === null || _l === void 0 ? void 0 : _l.getElementsByTagName('name').item(0)) === null || _m === void 0 ? void 0 : _m.innerHTML;
                    addr = (_p = (_o = stations === null || stations === void 0 ? void 0 : stations.item(index)) === null || _o === void 0 ? void 0 : _o.getElementsByTagName('addr').item(0)) === null || _p === void 0 ? void 0 : _p.innerHTML;
                    popup = new L.Popup().setContent(`${name}<br>${addr}<br>Slot: ${available}/${slots}`);
                    if (available < (slots * (1 / 3))) {
                        icon = this.markerRed.getIcon();
                    }
                    else if (available < (slots * (1 / 2))) {
                        icon = this.markerYellow.getIcon();
                    }
                    else {
                        icon = this.markerGreen.getIcon();
                    }
                    marker = new L.Marker([lat, lon], { icon: icon }).bindPopup(popup).openPopup();
                    marker.addTo(this.map);
                    this.markers.push(marker);
                }
            }
        });
    }
}
//# sourceMappingURL=mapsmanager.js.map