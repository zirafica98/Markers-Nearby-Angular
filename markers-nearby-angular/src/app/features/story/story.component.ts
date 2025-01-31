import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { StateService } from '../../core/services/state/state.service';
import { MarkerInfoComponent } from '../marker-info/marker-info.component';
import { GeoJsonComponent } from '../geo-json/geo-json.component';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit, AfterViewInit {
  @ViewChild(MarkerInfoComponent) markerInfoComponent!: MarkerInfoComponent;
  @ViewChild(GeoJsonComponent) geoJsonComponent!: GeoJsonComponent;

  @Input() map: L.Map | undefined;
  @Input() storyData: any[] = [];
  storyName: string | null = null;
  markers: L.Marker[] = [];
  pathLayer: L.Polyline | undefined;

  markerName: string = '';
  date: string = '';
  textWrap: string = '';
  wikiLink: string = '';
  lat: string = '';
  long: string = '';
  linkYoutube: string = '';
  bc_ad: string = '';
  dataLoaded: boolean = false;

  constructor(private route: ActivatedRoute, private stateService: StateService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.storyName = params.get('name');
    });
  }

  ngAfterViewInit(): void {
    // Ensure the ViewChild components are initialized
    if (this.geoJsonComponent) {
      console.log('GeoJsonComponent initialized');
      this.addMarkers();
    }
  }

  addMarkers(): void {
    if (this.stateService.getMapReady() && this.storyData.length > 0) {
      this.addMarkerSequentially(0);
    }
  }

  addMarkerSequentially(index: number): void {

    if (index >= this.storyData.length) return;

    const startLatLng = new L.LatLng(this.storyData[index].lat, this.storyData[index].long_marker);
    const endLatLng = index < this.storyData.length - 1
      ? new L.LatLng(this.storyData[index + 1].lat, this.storyData[index + 1].long_marker)
      : startLatLng;
    const duration = 5000; // duration in milliseconds

    const marker = L.marker([this.storyData[index].lat, this.storyData[index].long_marker], {
      icon: L.icon({
        iconUrl: 'https://mappinghistorybucket.s3.us-east-2.amazonaws.com/MappingHistoryMarker/' + this.storyData[index].image_name,
        iconSize: [50, 50],
      }),
    }).addTo(this.stateService.getMap());

    this.markers.push(marker);
    this.setMarkerInfo(this.storyData[index]);

    this.geoJsonComponent.loadGeoJsonForYear((this.storyData[index].date).split("/")[2]).then(() => {
      if (index === 0) {
        setTimeout(() => {
          this.startMarkerAnimation(marker, startLatLng, endLatLng, duration, index);
        }, 5000); // Wait for 5 seconds at the first event
      } else {
        this.startMarkerAnimation(marker, startLatLng, endLatLng, duration, index);
      }
    });
  }

  startMarkerAnimation(marker: L.Marker, startLatLng: L.LatLng, endLatLng: L.LatLng, duration: number, index: number): void {
    if (!this.pathLayer) {
      this.pathLayer = L.polyline([], {
        color: '#8B4513', // SaddleBrown color for a historical theme
        weight: 4,
        opacity: 0.7,
        dashArray: '10, 10',
        lineJoin: 'round'
      }).addTo(this.stateService.getMap());
    }

    this.animateMarker(marker, startLatLng, endLatLng, duration,index, () => {
      setTimeout(() => {
        if (index < this.storyData.length - 1) {
          marker.remove();
          this.setMarkerInfo(this.storyData[index+1]);
          this.addMarkerSequentially(index + 1);
        }
      }, 10000); // Wait for 10 seconds at each event point
    });
  }

  animateMarker(marker: L.Marker, startLatLng: L.LatLng, endLatLng: L.LatLng, duration: number,index:number, callback: () => void) {
    const startTime = performance.now();
    const tolerance = 0.0001; // Tolerance value for comparing coordinates

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const currentLat = startLatLng.lat + (endLatLng.lat - startLatLng.lat) * progress;
      const currentLng = startLatLng.lng + (endLatLng.lng - startLatLng.lng) * progress;

      const currentLatLng = new L.LatLng(currentLat, currentLng);
      marker.setLatLng(currentLatLng);

      if (this.pathLayer) {
        this.pathLayer.addLatLng(currentLatLng);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.setMarkerInfo(this.storyData.find(data => 
          Math.abs(data.lat - currentLatLng.lat) < tolerance && 
          Math.abs(data.long_marker - currentLatLng.lng) < tolerance
        ));
        callback();
      }
    };

    requestAnimationFrame(animate);
  }

  restartStory(): void {
    this.markers.forEach(marker => marker.remove());
    if (this.pathLayer) {
      this.pathLayer.remove();
      this.pathLayer = undefined;
    }
    this.addMarkers();
  }

  setMarkerInfo(data: any) {
    this.date = data.date || '';
    this.markerName = data.marker_name || '';
    this.textWrap = data.text_wrap || '';
    this.wikiLink = data.wiki || '';
    this.lat = data.lat || '';
    this.long = data.long_marker || '';
    this.linkYoutube = data.youtubeUrl || '';
    this.bc_ad = data.bc_ad || '';
    this.dataLoaded = true;
  }
}
