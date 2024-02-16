import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenNewAccountPage } from './open-new-account';

@NgModule({
  declarations: [
    OpenNewAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(OpenNewAccountPage),
  ],
})
export class OpenNewAccountPageModule {}
