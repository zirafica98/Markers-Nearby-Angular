import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private _mapReady: boolean = false;
  private _map:any=[];

  constructor() { }

  // Set metode
  setMapReady(mapReady: boolean): void {
    this._mapReady = mapReady;
  }
  setMap(map:any):void{
    this._map = map;
  }
  // Get metode
  getMapReady(): boolean {
    return this._mapReady;
  }
  getMap():any{
    return this._map;
  }

}
