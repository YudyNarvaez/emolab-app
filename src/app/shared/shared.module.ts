import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessagePipe } from './pipes/error-message.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';


@NgModule({
  declarations: [ErrorMessagePipe],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    IonicModule,
    CommonModule,
    ErrorMessagePipe,
    FormsModule,
    ReactiveFormsModule,
    EmojiModule
  ]
})
export class SharedModule { }
