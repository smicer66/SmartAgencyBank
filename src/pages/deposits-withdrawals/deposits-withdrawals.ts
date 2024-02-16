import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from "@ionic/storage";

import { CashDepositPage } from '../cash-deposit/cash-deposit';
import { CashWithdrawalPage } from '../cash-withdrawal/cash-withdrawal';
import { ChequeDepositPage } from '../cheque-deposit/cheque-deposit';
import { LoginPage } from '../login/login';

/**
 * Generated class for the DepositsWithdrawalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deposits-withdrawals',
  templateUrl: 'deposits-withdrawals.html',
})
export class DepositsWithdrawalsPage {

  constructor(public storage: Storage, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DepositsWithdrawalsPage');
  }
  
	goToCashDeposits(){
		this.navCtrl.push(CashDepositPage);
	}
	
	goToCashWithdrawals(){
		this.navCtrl.push(CashWithdrawalPage);
	}
	
	goToChequeDeposits()
	{
		this.navCtrl.push(ChequeDepositPage);
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
