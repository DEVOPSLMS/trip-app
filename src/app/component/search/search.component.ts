import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-search',
  standalone: false,

  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent implements OnInit {
  details: any[] = [];
  query: string = '';
  category: string = '';
  location_id: string = '';
  image: string = '';
  location_rating:string='';
  location_reviews:number=0;
  locationImages: { [key: string]: string } = {};
  private sub: any;
  constructor(private authService: AuthService, private route: ActivatedRoute,private router:Router) { }
  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.query = params['query'];
      console.log(this.query);
      this.category =params['category'];
      this.authService.getQuery(this.query,this.category).subscribe((query: any) => {
        this.details = query.data;

        this.details.forEach((element: any, index: number) => {
          this.location_id = element.location_id;

          this.authService.getQueryImage(this.location_id).subscribe((query: any) => {
            
            if (query.data.length > 0) {
              this.image = query.data[0].images.large.url;
              this.details[index].image_url = this.image;
             
            }

          })
          this.authService.getQueryDetails(this.location_id).subscribe((locationdetails:any)=>{
    
            this.location_rating= locationdetails.rating_image_url;
            this.location_reviews=locationdetails.num_reviews;
            this.details[index].location_rating=this.location_rating;
            this.details[index].location_reviews=this.location_reviews
          })
        })
      })
    })
  }
  navigateBack(){
    if (this.query.trim()) {
      this.router.navigate(['/search', this.query,this.category]);
    }
  }
}
