import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
declare const getCategory: any;
@Component({
  selector: 'app-search-all',
  standalone: false,

  templateUrl: './search-all.component.html',
  styleUrl: './search-all.component.css'
})
export class SearchAllComponent implements OnInit {
  attraction: any[] = [];
  hotel: any[] = [];
  restaurant: any[] = [];
  location_id: string = '';
  image: string = '';
  query: string = '';
  secondquery: string = '';
  location_rating:string=''
   location_reviews:string=''
  private sub: any;
  activeTab: string = '';
  rating:string='';
  description:string='';
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.query = params['query'];
      this.SearchAllWindowLoad();
      // this.getRestaurant();
       this.getAttractions();
      // this.getHotels();
      
      
    })
  }

  private getRestaurant() {
    this.authService.getQuery(this.query, 'restaurant').subscribe((query: any) => {
      this.restaurant = query.data;
      console.log(this.restaurant);

    })
  }
   private getAttractions() {

    this.authService.getQuery(this.query, 'attractions').subscribe((query: any) => {
      this.attraction = query.data;
      console.log(this.attraction);
      this.attraction.forEach((element: any, index: number) => {

        this.location_id = element.location_id;
        this.authService.getQueryImage(this.location_id).subscribe((query: any) => {

          if (query.data.length > 0) {
            this.image = query.data[0].images.large.url;
            this.attraction[index].image_url = this.image;

          }
       
        })
        this.authService.getQueryDetails(this.location_id).subscribe((locationdetails: any) => {

          this.location_rating = locationdetails.rating_image_url;
          this.location_reviews = locationdetails.num_reviews;
          this.rating=locationdetails.rating;
          this.description=locationdetails.description
         this.attraction[index].rating=this.rating;
          this.attraction[index].location_rating = this.location_rating;
          this.attraction[index].location_reviews = this.location_reviews;
          this.attraction[index].description=this.description;
        })
      })
      
    })
  }
  private getHotels() {
    this.authService.getQuery(this.query, 'hotels').subscribe((query: any) => {
      this.hotel = query.data;
      console.log(this.hotel);;

    })
  }
  navigateBack() {
    if (this.query.trim()) {
      this.router.navigate(['/search-all', this.query]);
    }
  }
  SearchAllWindowLoad(): void {
    const attractionsElement = document.getElementById("Attractions");
    const tabLinkElement = document.querySelector(".tablinks");

    if (attractionsElement) {
      attractionsElement.style.display = "block";
    }

    if (tabLinkElement) {
      tabLinkElement.classList.add("active");
    }

  }

}
