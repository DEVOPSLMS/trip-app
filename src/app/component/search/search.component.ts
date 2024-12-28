import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute } from '@angular/router';

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
  locationImages: { [key: string]: string } = {};
  private sub: any;
  constructor(private authService: AuthService, private route: ActivatedRoute) { }
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
            console.log(query);
            console.log(query.data.length);
            if (query.data.length > 0) {
              this.image = query.data[0].images.medium.url;
              this.details[index].image_url = this.image;
              console.log(this.image);
            }

          })
        })
      })
    })
  }

}
