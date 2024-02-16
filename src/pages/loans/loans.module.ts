import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoansPage } from './loans';

@NgModule({
  declarations: [
    LoansPage,
  ],
  imports: [
    IonicPageModule.forChild(LoansPage),
  ],
})
export class LoansPageModule {}
