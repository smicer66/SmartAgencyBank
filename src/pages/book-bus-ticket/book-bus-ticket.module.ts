import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookBusTicketPage } from './book-bus-ticket';

@NgModule({
  declarations: [
    BookBusTicketPage,
  ],
  imports: [
    IonicPageModule.forChild(BookBusTicketPage),
  ],
})
export class BookBusTicketPageModule {}
