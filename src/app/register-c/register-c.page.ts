import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterStateService } from '../shared/services/register-state/register-state.service';

@Component({
  selector: 'app-register-c',
  templateUrl: './register-c.page.html',
  styleUrls: ['./register-c.page.scss'],
})
export class RegisterCPage implements OnInit {

  userDataForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    last_name: ['', [Validators.required, Validators.maxLength(50)]],
    nit: ['', [Validators.required, Validators.maxLength(20)]],
    address: ['', [Validators.required, Validators.maxLength(50)]],
    contact: ['', [Validators.required, Validators.maxLength(15)]],
    is_parent: [true],
    is_health_professional: [false]
  });

  constructor(
    private router: Router,
    private registerState: RegisterStateService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  saveForm(){
    const values = this.userDataForm.value
    this.registerState.setState('userData', values);
    this.router.navigate(['/registern'])
  }

  get namesControl(){
    return this.userDataForm.get('name');
  }

  get lastnameControl(){
    return this.userDataForm.get('last_name');
  }

  get nitControl(){
    return this.userDataForm.get('nit');
  }

  get addressControl(){
    return this.userDataForm.get('address');
  }

  get contactControl(){
    return this.userDataForm.get('contact');
  }

  get isParentControl(){
    return this.userDataForm.get('is_parent');
  }

  get isHealthProfControl(){
    return this.userDataForm.get('is_health_professional');
  }

}
