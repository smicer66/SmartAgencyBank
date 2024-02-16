import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestChequeBookPage } from './request-cheque-book';

@NgModule({
  declarations: [
    RequestChequeBookPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestChequeBookPage),
  ],
})
export class RequestChequeBookPageModule {}
