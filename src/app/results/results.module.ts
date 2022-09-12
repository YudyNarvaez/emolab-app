import { NgModule } from '@angular/core';
import { ResultsPageRoutingModule } from './results-routing.module';
import { ResultsPage } from './results.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ResultsPageRoutingModule
  ],
  declarations: [ResultsPage]
})
export class ResultsPageModule {}
