import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FetchDataService } from '../../core/services/fetchData/fetch-data.service';
import { Marker, icon, Map } from 'leaflet';
import { StateService } from '../../core/services/state/state.service';
import { GeoJsonComponent } from '../geo-json/geo-json.component';
import { MarkerInfoComponent } from '../marker-info/marker-info.component';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss'],
})

export class MarkerComponent implements OnInit {
  layers: Marker[] = [];
  @ViewChild(GeoJsonComponent) geoJsonComponent!: GeoJsonComponent
  @ViewChild(MarkerInfoComponent) markerInfoComponent!: MarkerInfoComponent;  // Dodajemo MarkerInfoComponent

  @Input() map: Map | undefined;  // Prosleđujemo mapu kao input

  markerName: string = '';
  date: string = '';
  textWrap: string = '';
  wikiLink: string = '';
  lat: string = '';
  long: string = '';
  linkYoutube: string = '';
  bc_ad:string='';
  dataLoaded:boolean=false;


  constructor(
    private fetchDataService: FetchDataService,
    private stateService:StateService
  ) {}

  ngOnInit(): void {
    // Pretplata na transformisane podatke
    this.fetchDataService.processedData$.subscribe((data) => {
      console.log('Processed data for markers:', data);

      // Prikazivanje markera jedan po jedan
      data.forEach((item, index) => {
        setTimeout(() => {
          for (const m of this.layers) {
            this.stateService.getMap().removeLayer(m);  // Uklanjanje markera sa mape
          } 
          this.addMarker(item);
          this.setMarkerInfo(item);  // Prosleđujemo podatke u MarkerInfoComponent
          this.geoJsonComponent.loadGeoJsonForYear(item.year);
        }, index * 10000); 
      });
    });
  }

  addMarker(data: any) {
    if (!this.stateService.getMapReady) return; // Proverite da li mapa postoji pre nego što dodate markere

    const marker = new Marker([data.lat, data.long_marker], {
      icon: icon({
        iconUrl: 'https://mappinghistorybucket.s3.us-east-2.amazonaws.com/MappingHistoryMarker/'+data.img_name,
        iconSize: [50, 50],
      }),
    }).bindPopup(`<b>${data.name}</b><br>${data.description}`);

    this.layers.push(marker); // Dodajemo marker u slojeve
    marker.addTo(this.stateService.getMap());
  }

  setMarkerInfo(data: any) {
    if (this.markerInfoComponent ) {
      this.markerInfoComponent.date = data.date || '';
      this.markerInfoComponent.marker_name = data.marker_name || '';
      this.markerInfoComponent.text_wrap = data.text_wrap || '';
      this.markerInfoComponent.wiki_link = data.wiki || '';
      this.markerInfoComponent.lat = data.lat || '';
      this.markerInfoComponent.long = data.long_marker || '';
      this.markerInfoComponent.link_youtube = data.youtubeUrl || '';
      this.markerInfoComponent.bc_ad = data.bc_ad || '';
      this.markerInfoComponent.dataLoaded = true;

    }
  }

}
