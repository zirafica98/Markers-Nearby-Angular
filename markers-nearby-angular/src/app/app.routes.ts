import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { MapComponent } from './features/map/map.component';

const routes: Routes = [
    { path: ':location', component: MapComponent },
    { path: '', redirectTo: '/New York', pathMatch: 'full' },
  ];


  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
  export class AppRoutingModule { }