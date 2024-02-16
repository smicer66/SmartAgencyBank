import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { RequestChequeBookPage } from '../request-cheque-book/request-cheque-book';
import { RequestCardPage } from '../request-card/request-card';
import { ManageCardsPage } from '../manage-cards/manage-cards';
import { StopChequePaymentPage } from '../stop-cheque-payment/stop-cheque-payment';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ChequesCardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cheques-cards',
  templateUrl: 'cheques-cards.html',
})
export class ChequesCardsPage {

  token: any;
	
  constructor(public storage: Storage, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChequesCardsPage');
  }

	goToRequestChequeBook(){
		this.navCtrl.push(RequestChequeBookPage);
	}
	
	goToRequestCard(){
		this.navCtrl.push(RequestCardPage);
	}
	
	goToManageCards(){
		this.navCtrl.push(ManageCardsPage);
	}
	
	goToStopChequePayment(){
		this.navCtrl.push(StopChequePaymentPage);
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
		this.token = null;
		this.navCtrl.setRoot(LoginPage);
		
	}
	
	
}
