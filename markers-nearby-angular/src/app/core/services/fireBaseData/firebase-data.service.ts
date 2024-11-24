import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'; // koristimo `compat` modul za kompatibilnost sa trenutnom konfiguracijom
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
  constructor(private db: AngularFireDatabase) {}

  // Funkcija za čitanje podataka sa određene putanje
  getData(path: string): Observable<any> {
    return this.db.object(path).valueChanges(); // vraća Observable sa promenama vrednosti
  }

  // Funkcija za postavljanje podataka na određenu putanju
  setData(path: string, data: any): Promise<void> {
    return this.db.object(path).set(data);
  }

  // Funkcija za ažuriranje podataka na određenoj putanji
  updateData(path: string, data: any): Promise<void> {
    return this.db.object(path).update(data);
  }

  // Funkcija za brisanje podataka sa određene putanje
  deleteData(path: string): Promise<void> {
    return this.db.object(path).remove();
  }
}
