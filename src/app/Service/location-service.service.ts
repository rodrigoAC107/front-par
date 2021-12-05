import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private url_base = "http://localhost:8000/api";
  private header;

  constructor(private http: HttpClient, private authService: AuthService) {

    this.header = new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getToken()}`);
  }

  getLocations(provinceId?: string){
    let params = {
      provinceId
    }
    return this.http.get(`${this.url_base}/location/`, {headers: this.header, params});
  }
}
