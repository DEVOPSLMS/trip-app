import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  constructor() { }
  getQuery(query: string ,category:string) {
    console.log("what is happening")
    return this.http.get(`https://trip-app-ashen-mu.vercel.app/api/query?query=${query}&category=${category}`, {
      headers: {
        'accept': 'application/json',
        'X-Referer': 'http://localhost:4200',
      }
    });
  }
  likeThis(query: string) {
    console.log("what is happening")
    return this.http.get(`https://trip-app-ashen-mu.vercel.app/api/query?query=${query}&category=`, {
      headers: {
        'accept': 'application/json',
        'X-Referer': 'http://localhost:4200',
      }
    });
  }
  getQueryDetails(locationid: string) {

    return this.http.get(`https://trip-app-ashen-mu.vercel.app/api/querydetails?locationid=${locationid}`, {
      headers: {
        'accept': 'application/json',
        'X-Referer': 'http://localhost:4200',
        
      }
    });
  }
  getQueryImage(locationid: string) {

    return this.http.get(`https://trip-app-ashen-mu.vercel.app/api/queryimage?locationid=${locationid}`, {
      headers: {
        'accept': 'application/json',
        'X-Referer': 'http://localhost:4200'
      }
    });
  }

}
