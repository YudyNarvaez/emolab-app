import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterCPageRoutingModule } from './register-c-routing.module';

import { RegisterCPage } from './register-c.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RegisterCPageRoutingModule
  ],
  declarations: [RegisterCPage]
})
export class RegisterCPageModule {}
