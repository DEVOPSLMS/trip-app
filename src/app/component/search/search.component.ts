import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: false,
  
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  details: any[] = [];
  query:string='';
  category:string='';
  private sub: any;
constructor(private authService:AuthService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.sub=this.route.params.subscribe(params=>{
      this.query=params['query'];
      this.authService.getHotel(this.query).subscribe((details:any)=>{
        console.log(details);
      })
    })
  }

}