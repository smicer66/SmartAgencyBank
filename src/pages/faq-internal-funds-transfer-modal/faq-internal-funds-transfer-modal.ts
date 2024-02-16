import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FaqInternalFundsTransferModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faq-internal-funds-transfer-modal',
  templateUrl: 'faq-internal-funds-transfer-modal.html',
})
export class FaqInternalFundsTransferModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqInternalFundsTransferModalPage');
  }

}
