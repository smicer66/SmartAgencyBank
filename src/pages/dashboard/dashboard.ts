import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from "@ionic/storage";


import { RegisterStepThreePage } from '../register-step-three/register-step-three';
import { RegisterStepTwoPage } from '../register-step-two/register-step-two';
import { AnalysisPage } from '../analysis/analysis';
import { BillPaymentPage } from '../bill-payment/bill-payment';
import { FundsTransferPage } from '../funds-transfer/funds-transfer';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
	analysisRoot = AnalysisPage;
	billPaymentRoot = BillPaymentPage;
	transferRoot = FundsTransferPage;
	depositsRoot = RegisterStepThreePage;
	agentsRoot = RegisterStepThreePage;
	
	token: any = false;
	
	
	constructor(public storage: Storage, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad DashboardPage');
		this.storage.get('zambia_bank_customer_token').then((val) => {
			this.token = true;
		});
	}

}
