import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaqFlightTicketsModalPage } from './faq-flight-tickets-modal';

@NgModule({
  declarations: [
    FaqFlightTicketsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(FaqFlightTicketsModalPage),
  ],
})
export class FaqFlightTicketsModalPageModule {}
