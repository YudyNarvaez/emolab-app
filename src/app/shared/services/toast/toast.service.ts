import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }


  async showSuccess(message: string){
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      cssClass: 'success-toast',
      buttons: [
        {
          text: 'x',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }

  async showError(message: string){
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      cssClass: 'error-toast',
      buttons: [
        {
          text: 'x',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }
}
