import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  
    
  query:string='';
  ngOnInit(): void {
    console.log(this.query);
   
  }

}
