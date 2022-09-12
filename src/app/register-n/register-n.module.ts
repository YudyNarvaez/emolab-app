import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterNPageRoutingModule } from './register-n-routing.module';

import { RegisterNPage } from './register-n.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RegisterNPageRoutingModule
  ],
  declarations: [RegisterNPage]
})
export class RegisterNPageModule {}
