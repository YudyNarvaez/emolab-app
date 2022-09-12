import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  async setKey(key: string, value: string){
    await Preferences.set({
      key,
      value
    })
  }

  async getKeyValue(key: string): Promise<string>{
    const {value} =  await Preferences.get({ key });
    return value;
  }

  async removeKey(key: string) {
    await Preferences.remove({ key });
  }

  async clearKeys(){
    await Preferences.clear()
  }

}
