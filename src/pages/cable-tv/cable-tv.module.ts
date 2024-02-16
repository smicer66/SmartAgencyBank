import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CableTvPage } from './cable-tv';

@NgModule({
  declarations: [
    CableTvPage,
  ],
  imports: [
    IonicPageModule.forChild(CableTvPage),
  ],
})
export class CableTvPageModule {}
