import { Component, OnInit, } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

declare const console1: any;
declare const openCity: any;
@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  details: any[] = [];
  location_id: string = '';
  image: string = '';
  isInputFocused: boolean = false;
  showDropdown = false;
  pastSearches: string[] = [];
  suggestions :any[]= [];
  
  filteredSuggestions: string[] = [];

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    const savedSearches = localStorage.getItem('pastSearches');
    this.pastSearches = savedSearches ? JSON.parse(savedSearches) : [];
    this.suggestions = [...this.pastSearches];
    this.SearchAllWindowLoad();
//this.getItems();
  }

private getItems(){
  this.authService.likeThis("Singapore").subscribe((data: any) => {
    this.details = data.data;
    this.details.forEach((element: any, index: number) => {
      console.log()
      this.location_id = element.location_id;
      this.authService.getQueryImage(this.location_id).subscribe((query: any) => {
        console.log(query);
        if (query.data.length > 0) {
          this.image = query.data[0].images.large.url;
          this.details[index].image_url = this.image;

        }

      })
    })
  })
}
  query: string = '';
  navigateToRoute() {
    if (this.query.trim()) {
      this.saveSearchQuery(this.query.trim()); // Save the search only when navigating
      this.router.navigate(['/search-all', this.query]);
    }
  }
  navigateToHotels() {
    if (this.query.trim()) {
      this.router.navigate(['/search', this.query, 'hotels']);
    }
  }
  navigateToRestaurant() {
    if (this.query.trim()) {
      this.router.navigate(['/search', this.query, 'restaurant']);
    }
  }
  navigateToAttractions() {
    if (this.query.trim()) {
      this.router.navigate(['/search', this.query, 'attractions']);
    }
  }

  SearchAllWindowLoad(): void {
    const attractionsElement = document.getElementById("SearchAll");
    const tabLinkElement = document.querySelector(".tablinks");

    if (attractionsElement) {
      attractionsElement.style.display = "block";
    }

    if (tabLinkElement) {
      tabLinkElement.classList.add("active");
    }

  }
  onFocus(): void {
    this.isInputFocused = true;
    document.body.classList.add('page-focused'); // Add blur effect to the body
    this.showDropdown = true;
    this.showPastSearches();  
  }

  onBlur(): void {
    this.isInputFocused = false;
    document.body.classList.remove('page-focused');
    setTimeout(() => {
      if (this.query.trim() === '') {
        this.showDropdown = false; // Hide dropdown only if the query is empty
      }
    }, 100);
    }
   
    selectSuggestion(suggestion: string) {
      this.query = suggestion;
      this.showDropdown = false;
    }
    onSearch() {
      if (this.query.trim() === '') {
        // Show default suggestions when the search query is empty
        this.filteredSuggestions = this.suggestions;
      } else {
        // Filter suggestions based on input
        this.filteredSuggestions = this.suggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(this.query.toLowerCase())
        );
      }
      
      this.showDropdown = this.filteredSuggestions.length > 0 || this.query.trim() !== '';
    }
    showPastSearches(): void {
      // Show past searches when the input field is focused
      this.suggestions = [...this.pastSearches];
      this.showDropdown = true;
  
    }
    saveSearchQuery(query: string): void {
      if (query && !this.pastSearches.includes(query)) {
        this.pastSearches.unshift(query); // Add to the beginning of the list
        this.pastSearches = this.pastSearches.slice(0, 5); // Limit to 5 recent searches
        localStorage.setItem('pastSearches', JSON.stringify(this.pastSearches)); // Save to local storage
      }
    }
}
