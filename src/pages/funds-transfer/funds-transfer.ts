import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { FundsTransferWithinBankPage } from '../funds-transfer-within-bank/funds-transfer-within-bank';
import { FundsTransferSubsidiaryPage } from '../funds-transfer-subsidiary/funds-transfer-subsidiary';
import { FundsTransferOtherBanksPage } from '../funds-transfer-other-banks/funds-transfer-other-banks';
import { FundsTransferInternationalPage } from '../funds-transfer-international/funds-transfer-international';
import { LoginPage } from '../login/login';




/**
 * Generated class for the FundsTransferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-funds-transfer',
  templateUrl: 'funds-transfer.html',
})
export class FundsTransferPage {

  constructor(public storage: Storage, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FundsTransferPage');
  }
  
  transferWithinBank() {
		let params = {};
		this.navCtrl.push(FundsTransferWithinBankPage);
  }
  
  transferToOtherBank() {
		let params = {};
		this.navCtrl.push(FundsTransferOtherBanksPage);
  }
  
  intlTransfer() {
		let params = {};
		this.navCtrl.push(FundsTransferInternationalPage);
  }
  
  transferToSubsidiary() {
		let params = {};
		this.navCtrl.push(FundsTransferSubsidiaryPage);
  }

	
	
	

	logout()
	{
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		loading.present();
		this.storage.remove('zambia_bank_customer_token');
		this.storage.remove('zambia_bank_loggedInUser');
		loading.dismiss();
		this.navCtrl.setRoot(LoginPage);
		
	}
	
}
