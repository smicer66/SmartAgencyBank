import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CashWithdrawalPage } from './cash-withdrawal';

@NgModule({
  declarations: [
    CashWithdrawalPage,
  ],
  imports: [
    IonicPageModule.forChild(CashWithdrawalPage),
  ],
})
export class CashWithdrawalPageModule {}
