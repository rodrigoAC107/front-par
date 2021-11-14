import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})

export class AuthService {
    url_base = "http://localhost:8000/api";
  
    constructor(private http: HttpClient) {}
  
    login(data: Object) {
      return this.http.post(`${this.url_base}/login`, data);
    }

    setToken(token: string){
        localStorage.setItem('token', token);
    }

    getToken(){
        return localStorage.getItem('token');
    }

    removeToken(){
        localStorage.clear();
    }
  }

