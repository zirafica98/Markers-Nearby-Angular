import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { MapComponent } from './features/map/map.component';
import { StoryComponent } from './features/story/story.component';
import { ListStoryComponent } from './features/list-story/list-story.component';

const routes: Routes = [
    { path: 'location/:location', component: MapComponent },
    { path: '', redirectTo: 'location/New York', pathMatch: 'full' },
    { path: 'story/:story', component: MapComponent  },
    {path:'list-story', component: ListStoryComponent}
    
  ];


  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
  export class AppRoutingModule { }