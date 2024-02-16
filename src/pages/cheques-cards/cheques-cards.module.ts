import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChequesCardsPage } from './cheques-cards';

@NgModule({
  declarations: [
    ChequesCardsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChequesCardsPage),
  ],
})
export class ChequesCardsPageModule {}
