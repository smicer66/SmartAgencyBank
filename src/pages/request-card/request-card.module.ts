import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestCardPage } from './request-card';

@NgModule({
  declarations: [
    RequestCardPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestCardPage),
  ],
})
export class RequestCardPageModule {}
