import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FundsTransferWithinBankPage } from './funds-transfer-within-bank';

@NgModule({
  declarations: [
    FundsTransferWithinBankPage,
  ],
  imports: [
    IonicPageModule.forChild(FundsTransferWithinBankPage),
  ],
})
export class FundsTransferWithinBankPageModule {}
