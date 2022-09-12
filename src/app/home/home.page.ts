import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/service/login.service';
import { HomeService } from './service/home.service';
import { ToastService } from '../shared/services/toast/toast.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  analazing = false;
  user: any = {};
  analisisForm = this.formBuilder.group({
    text: ['', Validators.required],
    kid: ['', Validators.required]
  })
  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private homeService: HomeService,
    private loginService: LoginService,
    private router: Router,
    private http: HttpClient) { }


  ngOnInit(): void {
    this.getUserData();
  }
  getUserData() {
    this.homeService.getUserData().subscribe({
      next: (response: any) => {
        this.user = response;
      },
      error: (err: any) => {
        this.toastService.showError('Ha ocurrido un error obteniendo los datos del usuario');
      }
    })
  }

  analyzeText(text: string) {
    this.analazing = true;
    const body = { 'sentencia': text };
    this.homeService.getTextAnalasys(body).subscribe({
      next: data => {
        this.analazing = false
        this.router.navigate(['/results'], { state: { data } });
        this.analisisForm.reset();
      },
      error: (err: any) =>{
        this.analazing = false;
      }
    });
  }

  async logout() {
    await this.loginService.logout();
  }
}
