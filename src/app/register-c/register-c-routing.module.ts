import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterCPage } from './register-c.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterCPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterCPageRoutingModule {}
