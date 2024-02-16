import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageAccountsPage } from './manage-accounts';

@NgModule({
  declarations: [
    ManageAccountsPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageAccountsPage),
  ],
})
export class ManageAccountsPageModule {}
