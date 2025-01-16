import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute } from '@angular/router';
declare const plusDivs:any;
declare const currentDiv:any;
declare const showDivs:any;
@Component({
  selector: 'app-details',
  standalone: false,

  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  constructor(private authService: AuthService, private route: ActivatedRoute) { }
  private sub: any;
  location_id:string='';
  details: any;
  location_images:any[] = [];
  ngOnInit(): void {
    this.getDetails();
  }
  private getDetails(){
    this.sub = this.route.params.subscribe(params => {
      this.location_id = params['location_id'];
      this.authService.getQueryDetails(this.location_id).subscribe((details:any)=>{
        if(details){
          this.details=details;
        }
        console.log(this.details);
      })
      this.authService.getQueryImage(this.location_id).subscribe((location_images:any)=>{
        this.location_images=location_images.data;
        
      
      })
    })
  }
}
