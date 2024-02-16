import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayMerchantPage } from './pay-merchant';

@NgModule({
  declarations: [
    PayMerchantPage,
  ],
  imports: [
    IonicPageModule.forChild(PayMerchantPage),
  ],
})
export class PayMerchantPageModule {}
