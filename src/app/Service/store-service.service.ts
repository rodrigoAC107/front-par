import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {


  private url_base = "http://localhost:8000/api";
  private header;

  constructor(private http: HttpClient, private authService: AuthService) {

    this.header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getToken()}`)
    }
  }

  getStores(page: number = 1, perPage: number = 5): Observable<any> {
    return this.http.get(`${this.url_base}/store?page=${page}&perPage=${perPage}`, this.header);
  }
  
  getTypeStore(): Observable<any> {
    return this.http.get(`${this.url_base}/type-store`, this.header);
  }

  storeStore(store: any): Observable<any> {
    const body = store;
    return this.http.post(`${this.url_base}/store`, body, this.header);
  }
  
  showStore(id: number): Observable<any> {
    return this.http.get(`${this.url_base}/store/${id}`, this.header);
  }

  updateStore(store: any, id: number): Observable<any> {
    const body = store;
    return this.http.put(`${this.url_base}/store/${id}`, body, this.header);
}
}
