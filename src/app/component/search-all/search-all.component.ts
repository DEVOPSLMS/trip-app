import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute ,Router} from '@angular/router';
declare const getCategory: any;
declare const SearchAllWindowLoad:any;
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

  query: string = '';
  secondquery:string='';
  private sub: any;
  constructor(private authService:AuthService, private route: ActivatedRoute ,private router:Router){

  }
  ngOnInit(): void {
    this.sub=this.route.params.subscribe(params=>{
      this.query = params['query'];
      //this.getRestaurant();
      this.getAttractions();
      // this.getHotels();
    })
  }
  private getRestaurant(){
    this.authService.getQuery(this.query,'restaurant').subscribe((query:any)=>{
      this.restaurant=query.data;
      console.log(this.restaurant);
      
    })
  }
  private getAttractions(){
    this.authService.getQuery(this.query,'attractions').subscribe((query:any)=>{
      this.attraction=query.data;
      console.log(this.attraction);
      
    })
  }
  private getHotels(){
    this.authService.getQuery(this.query,'hotels').subscribe((query:any)=>{
      this.hotel=query.data;
      console.log(this.hotel);;
      
    })
  }
   navigateBack() {
    if (this.query.trim()) {
      this.router.navigate(['/search-all', this.query]);
    }
  }
}
