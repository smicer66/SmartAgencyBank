import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MobileTopUpPage } from './mobile-top-up';

@NgModule({
  declarations: [
    MobileTopUpPage,
  ],
  imports: [
    IonicPageModule.forChild(MobileTopUpPage),
  ],
})
export class MobileTopUpPageModule {}
