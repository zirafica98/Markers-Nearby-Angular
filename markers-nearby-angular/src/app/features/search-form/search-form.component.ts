import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  value: string = ''; // Ovo je za čuvanje vrednosti u input polju

  constructor(private router: Router) {}

  // Metoda koja se poziva pri submit-u forme
  handleSubmit(event: Event): void {
    event.preventDefault();  // Sprečava osvežavanje stranice pri submit-u

    // Navigacija na novu rutu sa parametrom location
   //this.router.navigate([this.value]);
   window.location.href = `/${this.value}`;  
  }
}
