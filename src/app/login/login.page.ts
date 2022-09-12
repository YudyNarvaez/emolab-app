import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../shared/services/toast/toast.service';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', Validators.required]
  });

  constructor(
    private toastService: ToastService,
    private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  login(){
    const credentials = this.loginForm.value;
    this.loginService.login(credentials).subscribe({
      next: (response: any) => {
        this.router.navigate(['/home']);
      },  
      error: (err: any) =>{
        this.toastService.showError('Email o contraseña incorrectos');
      }
    })
  }

  get usernameControl(){
    return this.loginForm.get('username');
  }

  get passwordControl(){
    return this.loginForm.get('password');
  }

}
