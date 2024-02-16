import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { MobileTopUpPage } from '../mobile-top-up/mobile-top-up';
import { CableTvPage } from '../cable-tv/cable-tv';
import { PayMerchantPage } from '../pay-merchant/pay-merchant';
import { PaySchoolFeesPage } from '../pay-school-fees/pay-school-fees';
import { BookFlightPage } from '../book-flight/book-flight';
import { BuyInternetDataPage } from '../buy-internet-data/buy-internet-data';
import { PayUtilitiesPage } from '../pay-utilities/pay-utilities';
import { BookBusTicketPage } from '../book-bus-ticket/book-bus-ticket';
import { BuyRailwayTicketPage } from '../buy-railway-ticket/buy-railway-ticket';
import { LoginPage } from '../login/login';

/**
 * Generated class for the BillPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bill-payment',
  templateUrl: 'bill-payment.html',
})
export class BillPaymentPage {

	constructor(public storage: Storage, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BillPaymentPage');
	}
 
  
	goToMobileTopUp() {
		let params = {};
		this.navCtrl.push(MobileTopUpPage);
	}
  
	goToCableTv() {
		let params = {};
		this.navCtrl.push(CableTvPage);
	}
  
	goToPayMerchant() {
		let params = {};
		this.navCtrl.push(PayMerchantPage);
	}
  
	goToSchoolFees() {
		let params = {};
		this.navCtrl.push(PaySchoolFeesPage);
	}
  
	goToBookAFlight() {
		let params = {};
		this.navCtrl.push(BookFlightPage);
	}
  
	goToBuyInternetData() {
		let params = {};
		this.navCtrl.push(BuyInternetDataPage);
	}
  
	goToUtilities() {
		let params = {};
		this.navCtrl.push(PayUtilitiesPage);
	}
  
	goToBookABusTicket() {
		let params = {};
		this.navCtrl.push(BookBusTicketPage);
	}
  
	goToBuyARailwayTicket() {
		let params = {};
		this.navCtrl.push(BuyRailwayTicketPage);
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
