import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChequeDepositPage } from './cheque-deposit';

@NgModule({
  declarations: [
    ChequeDepositPage,
  ],
  imports: [
    IonicPageModule.forChild(ChequeDepositPage),
  ],
})
export class ChequeDepositPageModule {}
