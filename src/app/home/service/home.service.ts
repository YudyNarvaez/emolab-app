import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  API_URL = environment.apiURL
  ANALYSIS_URL = environment.analysisURL
  constructor(private http: HttpClient) { }

  getUserData(){
    const url = `${this.API_URL}/v1/users/me`;
    return this.http.get(url);
  }

  getTextAnalasys(params: any){
    const url = `${this.ANALYSIS_URL}`;
    return this.http.post(url, params);
  }
}
