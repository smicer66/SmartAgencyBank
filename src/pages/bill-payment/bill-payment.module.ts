import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillPaymentPage } from './bill-payment';

@NgModule({
  declarations: [
    BillPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(BillPaymentPage),
  ],
})
export class BillPaymentPageModule {}
