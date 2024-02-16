import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepositsWithdrawalsPage } from './deposits-withdrawals';

@NgModule({
  declarations: [
    DepositsWithdrawalsPage,
  ],
  imports: [
    IonicPageModule.forChild(DepositsWithdrawalsPage),
  ],
})
export class DepositsWithdrawalsPageModule {}
