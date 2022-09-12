import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  API_URL = environment.apiURL;
  constructor(private http: HttpClient) { }

  getUserData(){
    const url = `${this.API_URL}/v1/users/me`;
    return this.http.get(url);
  }

  getTextAnalasys(params: any){
    const url = `${this.API_URL}/v1/sentiments/sentimiento`;
    return this.http.post(url, params);
  }

  saveResult(params: any){
    const url = `${this.API_URL}/v1/users/save-result/`;
    return this.http.post(url, params);
  }
}
