import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayUtilitiesPage } from './pay-utilities';

@NgModule({
  declarations: [
    PayUtilitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(PayUtilitiesPage),
  ],
})
export class PayUtilitiesPageModule {}
