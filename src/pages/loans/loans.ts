import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { LoanApplicationPage } from '../loan-application/loan-application';
import { LoanRepaymentSchedulePage } from '../loan-repayment-schedule/loan-repayment-schedule';
import { RepayLoanPage } from '../repay-loan/repay-loan';
import { LoginPage } from '../login/login';

/**
 * Generated class for the LoansPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loans',
  templateUrl: 'loans.html',
})
export class LoansPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoansPage');
  }
  
	goToLoanApplication(){
		let params = {};
		this.navCtrl.push(LoanApplicationPage);
	}
  
	goToLoanRepaymentSchedule(){
		let params = {};
		this.navCtrl.push(LoanRepaymentSchedulePage);
	}
  
	goToRepayLoan(){
		let params = {};
		this.navCtrl.push(RepayLoanPage);
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
