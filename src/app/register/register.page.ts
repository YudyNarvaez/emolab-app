import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterStateService } from '../shared/services/register-state/register-state.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  accountDataForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
  });
  
  constructor(
    private registerState: RegisterStateService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
  }

  saveForm(){
    const values = this.accountDataForm.value
    this.registerState.setState('accountData', values);
    this.router.navigate(['/registerc'])
  }

  get emailControl(){
    return this.accountDataForm.get('email');
  }

  get passwordControl(){
    return this.accountDataForm.get('password');
  }
}
