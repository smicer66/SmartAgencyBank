import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CashDepositPage } from './cash-deposit';

@NgModule({
  declarations: [
    CashDepositPage,
  ],
  imports: [
    IonicPageModule.forChild(CashDepositPage),
  ],
})
export class CashDepositPageModule {}
