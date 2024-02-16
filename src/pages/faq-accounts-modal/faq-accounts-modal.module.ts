import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaqAccountsModalPage } from './faq-accounts-modal';

@NgModule({
  declarations: [
    FaqAccountsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(FaqAccountsModalPage),
  ],
})
export class FaqAccountsModalPageModule {}
