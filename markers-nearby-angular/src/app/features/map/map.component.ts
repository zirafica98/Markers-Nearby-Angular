import { Component, Input, OnInit, ViewChild } from '@angular/core';
import L, { latLng, tileLayer, Map, MapOptions, circle } from 'leaflet';
import { FirebaseDataService } from '../../core/services/fireBaseData/firebase-data.service';
import { FetchDataService } from '../../core/services/fetchData/fetch-data.service';
import { MarkerComponent } from '../marker/marker.component';
import { GeoJsonComponent } from '../geo-json/geo-json.component';
import { StateService } from '../../core/services/state/state.service';
import { ActivatedRoute } from '@angular/router';
import { CityService } from '../../core/services/cityData/city.service';
import { StoryDataService } from '../../core/services/storyData/story-data.service';
import { SearchFormComponent } from '../search-form/search-form.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild(MarkerComponent) markerComponent!: MarkerComponent; // Inicijalizuje komponentu MarkerComponent

  markersData: any[] = [];
  map: Map | undefined;
  location: string | null = null;
  centralMarker: any;
  radius: any;
  origin: any;
  options: MapOptions = {}; // Opcije za mapu
  options1: any;
  story: string | null = null;
  storyData: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private firebaseDataService: FirebaseDataService,
    private fetchDataService: FetchDataService,
    private stateService: StateService,
    private cityService: CityService,
    private storyDataService: StoryDataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.location = params.get('location') || "";
      this.story = params.get('story') || "";

      if (this.story) {
        this.firebaseDataService.getData("0/0/"+this.story).subscribe(
          (data) => {
            this.storyData = data;
            this.options1 = {
              layers: [
                tileLayer('https://api.maptiler.com/maps/voyager/256/{z}/{x}/{y}.png?key=tbxxnHOYRKXeGzScTE2D', {
                  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }),
                ...data.map((storyPoint: any) => circle([storyPoint.lat, storyPoint.long_marker], { radius: 5000 }))
              ],
              zoom: 5,
              center: latLng(data[0].lat, data[0].long_marker)
            };
            this.origin = [data[0].lat, data[0].long_marker];
            this.radius = 5000;
          },
          (error) => {
            console.error('Error fetching story data:', error);
          }
        );
      } else {
        this.cityService.searchCity(this.location).subscribe(
          (result) => {
            const lat = result[0].lat;
            const lon = result[0].lon;
            this.options1 = {
              layers: [
                tileLayer('https://api.maptiler.com/maps/voyager/256/{z}/{x}/{y}.png?key=tbxxnHOYRKXeGzScTE2D', {
                  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }),
                circle([lat, lon], { radius: 5000 }),
              ],
              zoom: 14,
              center: latLng(lat, lon)
            };
            this.origin = [lat, lon];
            this.radius = 5000;
            this.firebaseDataService.getData('/2/data').subscribe(
              (data) => {
                this.fetchDataService.processAndEmitData(data, this.origin, this.radius);
              },
              (error) => {
                console.error('Error fetching data:', error);
              }
            );
          },
          (error) => {
            console.error('Greška pri pretrazi grada:', error);
          }
        );
      }
    });
  }

  onMapReady(event: Map) {
    this.stateService.setMapReady(true);
    this.stateService.setMap(event);
    event.invalidateSize();

    if (this.options1) {
      event.setView([this.options1.center.lat, this.options1.center.lng], this.options1.zoom);
      event.invalidateSize();
    }
  }
}
