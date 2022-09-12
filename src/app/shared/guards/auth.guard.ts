import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from 'src/app/login/service/login.service';

@Injectable({
  providedIn: 'root'
})

export class IsAuthenticated implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.loginService.isAuthenticated();
    if (isAuthenticated) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class IsNotAuthenticated implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.loginService.isAuthenticated();
    if (!isAuthenticated) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
