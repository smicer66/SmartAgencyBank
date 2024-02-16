import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageCardsPage } from './manage-cards';

@NgModule({
  declarations: [
    ManageCardsPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageCardsPage),
  ],
})
export class ManageCardsPageModule {}
