import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiUrl = environment.apiURL
  constructor(private http: HttpClient) {}

  createUser(params: any){
    return this.http.post(`${this.apiUrl}/v1/auth/registration`, params);
  }

  registerKids(params: any){
    return this.http.post(`${this.apiUrl}/v1/auth/kids-registration`, params);
  }


}
