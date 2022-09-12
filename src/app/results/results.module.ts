import { NgModule } from '@angular/core';
import { ResultsPageRoutingModule } from './results-routing.module';
import { ResultsPage } from './results.page';
import { SharedModule } from '../shared/shared.module';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
@NgModule({
  imports: [
    EmojiModule,
    SharedModule,
    ResultsPageRoutingModule
  ],
  declarations: [ResultsPage]
})
export class ResultsPageModule {}
