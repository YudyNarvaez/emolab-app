import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonDatetime, IonModal, NavController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { mergeMap } from 'rxjs/operators';
import { LoginService } from '../login/service/login.service';
import { RegisterStateService } from '../shared/services/register-state/register-state.service';
import { RegisterService } from '../shared/services/register/register.service';

@Component({
  selector: 'app-register-n',
  templateUrl: './register-n.page.html',
  styleUrls: ['./register-n.page.scss'],
})
export class RegisterNPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(IonDatetime) dateTime: IonDatetime;
  today = format(new Date(), 'yyyy-MM-dd');
  edit = false;
  displayBirthDay = format(new Date(), 'dd-MM-yyyy');
  acceptedConditions = false;
  registeredKids = []
  kidsDataForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    last_name: ['', [Validators.required, Validators.maxLength(50)]],
    birthday: [this.today, Validators.required],
    gender: ['', Validators.required],
    has_asperger: [false, Validators.required]
  });
  copyKid: any;

  constructor(
    private navController: NavController,
    private loginService: LoginService,
    private router: Router,
    private registerState: RegisterStateService,
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) { }

  ngOnInit() {
  }

  addKid(){
    const kidData = this.kidsDataForm.value;
    this.registeredKids.push(kidData);
    this.registerState.setState('kidsData', this.registeredKids);
  }

  async editKid(kid: any){
    this.edit = true;
    this.copyKid = kid;
    this.kidsDataForm.setValue({...kid});
    this.kidsDataForm.updateValueAndValidity();
    this.displayBirthDay = format(parseISO(this.birthdayControl.value), 'dd-MM-yyyy');
    await this.modal.present();
  }

  removeKid(kid: any){
    const index = this.registeredKids.findIndex(x => x == kid);
    this.registeredKids.splice(index, 1);
  }

  endRegister(){
    let state = this.registerState.state
    let registrationParams = {...state.accountData, ...state.userData}
    this.registerService.createUser(registrationParams).pipe(
      mergeMap((result: any) =>{
        console.log(result)
        let kidsRegistrationParams = {kids:[...state.kidsData], user_id: result.id}
        return this.registerService.registerKids(kidsRegistrationParams)
      }),
      mergeMap((result: any)=>{
        return this.loginService.login({username: state.accountData.email, password: state.accountData.password})
      })
    ).subscribe({
      next: (response: any) => {
        this.registerState.clearState();
        this.router.navigate(['/home'])
      },
      error: (err:any) => {
        console.log(err)
      }
    })
  }

  close(){
    this.modal.dismiss(null, 'cancel');
    this.edit = false;    
    this.kidsDataForm.reset();
    this.dateTime.reset(this.today);
    this.displayBirthDay = format(new Date(), 'dd-MM-yyyy');
  }

  confirm(){
    if(!this.edit){
      this.addKid();
    }else{
      const index = this.registeredKids.findIndex(x => x == this.copyKid);
      const kidData = this.kidsDataForm.value;
      this.registeredKids[index] = kidData;
    }
    this.close();
  }

  formatDate(value){
    if(value){
      const birthday = this.kidsDataForm.get('birthday');
      const date = format(parseISO(value), 'yyyy-MM-dd');
      this.displayBirthDay = format(parseISO(date), 'dd-MM-yyyy');
      birthday.patchValue(date);
      birthday.updateValueAndValidity();
    }
  }

  get nameControl(){
    return this.kidsDataForm.get('name')
  }

  get lastnameControl(){
    return this.kidsDataForm.get('last_name')
  }

  get birthdayControl(){
    return this.kidsDataForm.get('birthday')
  }

  get gender(){
    return this.kidsDataForm.get('gender')
  }

  get hasAspergerControl(){
    return this.kidsDataForm.get('has_asperger')
  }

  goBack(){
    this.navController.back()
  }

}
