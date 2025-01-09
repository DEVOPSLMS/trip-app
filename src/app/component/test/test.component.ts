import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: false,
  
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  showDropdown = false;
  searchQuery = '';
  suggestions = [
    'Popular Attraction 1',
    'Popular Attraction 2',
    'Top Destination 1',
    'Famous Place 1',
    'Recently Searched Place'
  ];
  filteredSuggestions: string[] = [];

  onSearch() {
    if (this.searchQuery.trim() === '') {
      // Show default suggestions when the search query is empty
      this.filteredSuggestions = this.suggestions;
    } else {
      // Filter suggestions based on input
      this.filteredSuggestions = this.suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  onFocus() {
    document.body.classList.add('page-focused'); // Add blur effect to the body
    this.showDropdown = true;
    this.onSearch(); // Trigger search to show suggestions, even if input is empty
  }

  selectSuggestion(suggestion: string) {
    this.searchQuery = suggestion;
    this.showDropdown = false;
  }
  onBlur() {
    document.body.classList.remove('page-focused'); // Remove blur effect from the body
  }
  hideDropdown() {
    // Use a small timeout to allow selection before dropdown hides
    setTimeout(() => {
      this.showDropdown = false;
    }, 100);
  }
}
