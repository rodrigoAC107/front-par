import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './AuthService.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private url_base = "http://localhost:8000/api";
  private header;

  constructor(private http: HttpClient, private authService: AuthService) {

    this.header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getToken()}`)
    }
  }

  getLocations(){
    return this.http.get(`${this.url_base}/location`, this.header);
  }
}
