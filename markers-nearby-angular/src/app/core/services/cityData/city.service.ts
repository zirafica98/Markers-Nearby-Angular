// city.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  // Koristićemo Observable za asinhrone odgovore

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private apiUrl = 'https://nominatim.openstreetmap.org/search?format=json&limit=3&q=';

  constructor(private http: HttpClient) {}

  // Metoda koja vraća Observable sa rezultatima pretrage
  searchCity(cityName: string ): Observable<any> {
    const url = `${this.apiUrl}${encodeURIComponent(cityName)}`;
    return this.http.get<any>(url);  // Vraćamo Observable tipa `any` (možete koristiti specifičniji tip umesto `any`)
  }
}
