import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoanRepaymentSchedulePage } from './loan-repayment-schedule';

@NgModule({
  declarations: [
    LoanRepaymentSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(LoanRepaymentSchedulePage),
  ],
})
export class LoanRepaymentSchedulePageModule {}
