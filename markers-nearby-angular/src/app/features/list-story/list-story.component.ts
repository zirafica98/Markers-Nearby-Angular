import { Component, OnInit } from '@angular/core';
import { StoryDataService } from '../../core/services/storyData/story-data.service';
import { FirebaseDataService } from '../../core/services/fireBaseData/firebase-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-story',
  templateUrl: './list-story.component.html',
  styleUrls: ['./list-story.component.css']
})
export class ListStoryComponent implements OnInit {
  stories: string[] = [];
  selectedStory: string | null = null;
  storyDetails: any[] = [];

  constructor(private storyDataService: StoryDataService, private firebaseDataService:FirebaseDataService, private router: Router) {}

  ngOnInit(): void {
    
    this.firebaseDataService.getData("0/0").subscribe(data => {
      this.stories = Object.keys(data);
    });
  }

  onStorySelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const story = selectElement.value;
    this.selectedStory = story;
    this.firebaseDataService.getData("0/0/"+story).subscribe(data => {
      this.storyDetails = data;
    });
  }

  navigateToStory() {
    this.router.navigate(['/story', this.selectedStory]);
  }
}
