import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  constructor() { }
  getQuery(query: string) {
      console.log("what is happening")
        return this.http.post(`https://trip-app-ashen-mu.vercel.app/api/query?query=${query}`, {
          headers: {
            'accept': 'application/json',
            'Referer': 'https://trip-app-ashen-mu.vercel.app/'
          }
        });
  }
  getQueryDetails(locationID: string) {
    
    return this.http.post(`https://trip-app-ashen-mu.vercel.app/api/querydetails?locationid=${locationID}`, {
      headers: {
        'accept': 'application/json',
        'Referer': 'https://trip-app-ashen-mu.vercel.app/'
      }
    });
  

}
}
