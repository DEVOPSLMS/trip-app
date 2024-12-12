import { Component, OnInit } from '@angular/core';
import * as dotenv from 'dotenv'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'trip-app';
  ngOnInit(): void {
    console.log(process.env["UNKNOWN_KEY"]);
  }
}
