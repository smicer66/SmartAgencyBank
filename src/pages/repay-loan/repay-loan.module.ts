import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepayLoanPage } from './repay-loan';

@NgModule({
  declarations: [
    RepayLoanPage,
  ],
  imports: [
    IonicPageModule.forChild(RepayLoanPage),
  ],
})
export class RepayLoanPageModule {}
