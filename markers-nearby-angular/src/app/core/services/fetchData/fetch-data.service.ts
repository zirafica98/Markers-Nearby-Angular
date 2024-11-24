import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  private processedDataSubject = new BehaviorSubject<any[]>([]);
  processedData$ = this.processedDataSubject.asObservable();

  constructor() {}

    // Funkcija koja računa udaljenost između dve tačke (origin, destination)
    getDistance(origin: number[], destination: number[]): number {
      var lon1 = this.toRadian(origin[1]),
        lat1 = this.toRadian(origin[0]),
        lon2 = this.toRadian(destination[1]),
        lat2 = this.toRadian(destination[0]);
  
      var deltaLat = lat2 - lat1;
      var deltaLon = lon2 - lon1;
  
      var a =
        Math.pow(Math.sin(deltaLat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
      var c = 2 * Math.asin(Math.sqrt(a));
      var EARTH_RADIUS = 6371;
      return c * EARTH_RADIUS * 1000; // Vraća udaljenost u metrima
    }
  
    // Funkcija za konvertovanje stepena u radijane
    toRadian(degree: number): number {
      return (degree * Math.PI) / 180;
    }

    processAndEmitData(rawData: any[], origin: number[], radius:number) {
      let records: any[] = [];  // Niz za usklađene podatke

    rawData.forEach((item) => {
      // Izračunavanje udaljenosti između početne tačke (origin) i markera
      const distance = this.getDistance(origin, [item.lat, item.long_marker]);

      // Ako je udaljenost manja od radijusa i ima manje od 10 markera
      if (distance <= radius && records.length < 10) {
        records.push({
          ...item,
          distance, // Dodajemo udaljenost kao novo svojstvo
          transformed: true, // Možete dodati bilo koji drugi atribut koji želite
        });
      }
    });

    // Emitovanje filtriranih i transformisanih podataka
      if(records && records.length > 0){
        this.processedDataSubject.next(records);

      }
    }
}
