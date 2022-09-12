import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterNPage } from './register-n.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterNPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterNPageRoutingModule {}
