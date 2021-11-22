import { Injectable, Output } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./AuthService.service";
import { Observable } from "rxjs";
import { Beneficiario } from "../models/beneficiario";
import { EventEmitter } from "events";

@Injectable({
    providedIn: "root"
})

export class BeneficiarioService {
    private url_base = "http://localhost:8000/api";
    private header;

    constructor(private http: HttpClient, private authService: AuthService) {

        this.header = {
            headers: new HttpHeaders()
                .set('Authorization', `Bearer ${this.authService.getToken()}`)
        }
    }

    getBeneficiaries(page: number = 1, perPage: number = 5): Observable<any> {
        return this.http.get(`${this.url_base}/beneficiary?page=${page}&perPage=${perPage}`, this.header);
    }

    storeBeneficiary(beneficiario: Beneficiario): Observable<any> {
        const body = beneficiario;
        return this.http.post(`${this.url_base}/beneficiary`, body, this.header);
    }

    showBeneficiary(id: number): Observable<any> {
        return this.http.get(`${this.url_base}/beneficiary/${id}`, this.header);
    }
    
    updateBeneficiary(beneficiario: Beneficiario, id: number): Observable<any> {
        const body = beneficiario;
        return this.http.put(`${this.url_base}/beneficiary/${id}`, body, this.header);
    }
}

