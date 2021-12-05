import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  private url_base = "http://localhost:8000/api";
  private header;

  constructor(private http: HttpClient, private authService: AuthService) {

    this.header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getToken()}`)
    }
  }

  getProvinces(){
    return this.http.get(`${this.url_base}/province`, this.header);
  }
}
