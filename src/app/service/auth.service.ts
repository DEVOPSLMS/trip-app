import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private key = process.env['UNKNOWN_KEY'];
  constructor() { }
  getHotel(query: string, category: string) {
    
        // Now make the second API call using the retrieved key
        return this.http.get(`https://api.content.tripadvisor.com/api/v1/location/search?key=${this.key}&searchQuery=${query}&category=${category}`, {
          headers: {
            'accept': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4200'
          }
        });
      
    
  }
}
