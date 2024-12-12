import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  constructor() { }
  getHotel(query: string) {
    
        // Now make the second API call using the retrieved key
        return this.http.get(`http://localhost:8000/query?query=${query}`, {
          headers: {
            'accept': 'application/json',
          }
        });
      
    
  }
}
