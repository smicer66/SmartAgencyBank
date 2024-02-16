import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaqLoanApplicationsModalPage } from './faq-loan-applications-modal';

@NgModule({
  declarations: [
    FaqLoanApplicationsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(FaqLoanApplicationsModalPage),
  ],
})
export class FaqLoanApplicationsModalPageModule {}
