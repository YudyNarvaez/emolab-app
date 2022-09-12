import { Injectable } from '@angular/core';
import { REGISTER_STATE_KEY } from '../../constants/keys';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterStateService {

  state: { [key: string]: any } = {
    accountData : null,
    userData: null,
    kidsData: null
  }

  constructor(private localStorageService: LocalStorageService) { }


  clearState(){
    this.state = {
      accountData : null,
      userData: null,
      kidsData: null
    }
  }

  setState(formKey: string, value: any){
    this.state[formKey] = value;
  }

  getState(){
    return this.state
  }

  async saveState(){
    const jsonState = JSON.stringify(this.state);
    await this.localStorageService.setKey(REGISTER_STATE_KEY, jsonState)
  }

}
