import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { ACCESS_TOKEN_KEY } from 'src/app/shared/constants/keys';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import * as moment from 'moment'; 
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URL = environment.apiURL
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private http: HttpClient
    ) { }

  login(credentials: any){
    const url = `${this.API_URL}/v1/auth/access-token`;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set('accept', 'application/json');
    const body = new HttpParams()
       .set('username', credentials.username)
       .set('password', credentials.password);
    return this.http.post<any>(url, body, {headers}).pipe(
      tap((token) =>{
        const stringTokenData = JSON.stringify(token);
        this.localStorageService.setKey(ACCESS_TOKEN_KEY, stringTokenData);
      })
    );
  }

  async isAuthenticated() {
    try{
      const value = await this.localStorageService.getKeyValue(ACCESS_TOKEN_KEY)
      const token = JSON.parse(value);
      const expiresAt = moment.unix(token.expires_at)
      return moment().isBefore(expiresAt);
    }catch{
      return false;
    }
  }

  async logout(){
    await this.localStorageService.clearKeys();
    this.router.navigate(['/login']);
  }

}

