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
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    // this.authService.likeThis("Singapore").subscribe((data: any) => {
    //   this.details = data.data;
    //   this.details.forEach((element: any, index: number) => {
    //     console.log()
    //     this.location_id = element.location_id;
    //     this.authService.getQueryImage(this.location_id).subscribe((query: any) => {
    //       console.log(query);
    //       if (query.data.length > 0) {
    //         this.image = query.data[0].images.large.url;
    //         this.details[index].image_url = this.image;

    //       }

    //     })
    //   })
    // })
    this.SearchAllWindowLoad();

  }


  query: string = '';
  navigateToRoute() {
    if (this.query.trim()) {
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
}
