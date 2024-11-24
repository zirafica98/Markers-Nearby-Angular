import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FirebaseDataService } from './core/services/fireBaseData/firebase-data.service';
import { environment } from './environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { MapComponent } from './features/map/map.component';
import { MarkerComponent } from './features/marker/marker.component';
import { GeoJsonComponent } from './features/geo-json/geo-json.component';
import { FetchDataService } from './core/services/fetchData/fetch-data.service';
import { SafeUrlPipe } from './core/pipes/safe-url.pipe';
import { HttpClientModule } from '@angular/common/http'; // Importujte HttpClientModule
import { MarkerInfoComponent } from './features/marker-info/marker-info.component';
import { AppRoutingModule } from './app.routes';
import { SearchFormComponent } from './features/search-form/search-form.component';
import { FormsModule } from '@angular/forms';  // Dodajte ovo za ngModel


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MarkerComponent,
    SafeUrlPipe,
    GeoJsonComponent,
    MarkerInfoComponent,
    SearchFormComponent
  ],
  imports: [
    BrowserModule,
    LeafletModule,  // Registruj LeafletModule ovde
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicijalizacija Firebase-a
    AngularFireDatabaseModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [FirebaseDataService,FetchDataService],
  bootstrap: [AppComponent]
  
})
export class AppModule {}
