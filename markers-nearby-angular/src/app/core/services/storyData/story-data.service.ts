import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoryDataService {
  private storyDataUrl = 'https://mapping-history-7242b-default-rtdb.firebaseio.com/0/0'; // Path to the JSON file

  constructor(private http: HttpClient) {}

  getStoryData(storyName: string): Observable<any> {
    return this.http.get<any>(this.storyDataUrl).pipe(
      map((data: any) => data[storyName])
    );
  }

  getStories(): Observable<any> {
    return this.http.get<any>(this.storyDataUrl);
  }
}
