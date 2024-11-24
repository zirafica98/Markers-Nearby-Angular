import { Component, Input, input } from '@angular/core';
import { Map, tileLayer, geoJSON, latLng, Marker, Layer } from 'leaflet';
import { StateService } from '../../core/services/state/state.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-geo-json',
  templateUrl: './geo-json.component.html',
  styleUrl: './geo-json.component.scss'
})
export class GeoJsonComponent {
  private geoJsonLayer: Layer | null = null;  // Držimo referencu na GeoJSON sloj
  @Input() year: string = ""; 
  data:any = [];
  availableYears:number[] = [-1,-1000,-200,-2000,-323,-500,1000,117,1279,1492,1530,1650,1715,1783,1815,1830,1850,1861,1872,1880,1914,1920,1938,1939,1940,1941,1942,1943,1944,1945,1946,1994,2020,400,600,800]
  constructor(
    private stateService:StateService,
    private http: HttpClient
  ){}

  getClosestYear(targetYear: number): number {
    const closestYear = this.availableYears.reduce((prev, curr) => {
      return (Math.abs(curr - targetYear) < Math.abs(prev - targetYear) ? curr : prev);
    });
    return closestYear;
  }

  async loadGeoJsonForYear(year: number): Promise<void> {
    this.removeGeoJson();
    try {
      const closestYear = this.getClosestYear(year);  // Pronaći najbližu godinu
      
      this.http.get(`https://raw.githubusercontent.com/zirafica98/GeoJson/main/world_${closestYear}.json`).subscribe((data: any) => {
        // this.geoJsonLayer = geoJSON(data);  
        // this.geoJsonLayer.addTo(this.stateService.getMap());

        this.geoJsonLayer = geoJSON(data, {
          style: (feature) => {
            return this.getStyleForFeature(feature);  // Dinamičko određivanje stila
          }
        })
        this.geoJsonLayer.addTo(this.stateService.getMap());
      }, (error) => {
        console.error('Greška pri učitavanju GeoJSON podataka za godinu ' + closestYear, error);
      });
    } catch (error) {
      console.error('Greška pri učitavanju GeoJSON podataka za godinu ' + year, error);
    }
  }

  removeGeoJson(): void {
    if (this.geoJsonLayer) {
      this.stateService.getMap().removeLayer(this.geoJsonLayer);  // Uklanjamo GeoJSON sloj sa mape
      this.geoJsonLayer = null;  // Resetujemo referencu
    }
  }

  private getStyleForFeature(feature: any) {
    // Možete promeniti stil bazirano na svojstvima GeoJSON objekta
    return {
      color: feature.properties.color || 'blue', // Boja linije
      weight: feature.properties.weight || 0.5,    // Debljina linije
      opacity: feature.properties.opacity || 0.4,  // Opacitet
      fillColor: feature.properties.fill || 'yellow',  // Boja popune
      fillOpacity: feature.properties.fillOpacity || 0.4 // Opacitet popune
    };
  }
}
