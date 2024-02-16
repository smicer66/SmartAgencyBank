import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoanApplicationPage } from './loan-application';

@NgModule({
  declarations: [
    LoanApplicationPage,
  ],
  imports: [
    IonicPageModule.forChild(LoanApplicationPage),
  ],
})
export class LoanApplicationPageModule {}
