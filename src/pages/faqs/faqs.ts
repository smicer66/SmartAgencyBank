import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams, ToastController, ActionSheetController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/take';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { IntlTransferBeneficiaryModalPage } from '../intl-transfer-beneficiary-modal/intl-transfer-beneficiary-modal';
import { LoginPage } from '../login/login';


/**
 * Generated class for the FaqsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faqs',
  templateUrl: 'faqs.html',
})
export class FaqsPage {

	itemslist: any = [];
	itemExpandHeight: number = 100;
	
	constructor(public modalCtrl: ModalController,  public storage: Storage, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: HttpClient, public platform: Platform, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad FaqsPage');
		this.itemslist = [{
			'id' : 1,
			'title' : 'Accounts',
			'text' : 'You can add more than one of your bank accounts to your Banc ABC mobile app. You can also remove any of the accounts from the mobile app any time you want',
			'expanded':false
			},
			{
			'id' : 2,
			'title' : 'Mini Statement',
			'text' : 'Provides your recent transactions performed on your accounts providing details such as date of transaction, amount of transaction and transaction type',
			'expanded':false
			},
			{
			'id' : 3,
			'title' : 'Funds Transfer Within Banc ABC',
			'text' : 'Provides you the ability to transfer funds from your account to any account. Banc ABC provide you the opportunity to transfer funds from accounts within Banc ABC easily.\n\nYou can also transfer funds from your account to other banks in Zambia in addition to transfering funds from your account to subsidiaries within Africa.\n\nTake advantage of our international funds transfer to send money to family and friends outside Zambia',
			'expanded':false
			},
			{
			'id' : 7,
			'title' : 'Airtime TopUp',
			'text' : 'Top Up your mobile phones airtime credit easily by using your mobile application.\nOur airtime top up provides you the choice of purchasing using the Pin or the Pinless option.\n\nPin option delivers your mobile airtime units via a pin sent to you by sms.',
			'expanded':false
			},
			{
			'id' : 8,
			'title' : 'Flight Tickets Purchase',
			'text' : 'Travel anytime around the world by buying flight tickets at your comfort on your Banc ABC mobile application. Payment for flight tickets has never been this easier',
			'expanded':false
			},
			{
			'id' : 9,
			'title' : 'Train Tickets Purchase',
			'text' : 'Travel anytime around Zambia by buying train tickets at your comfort on your Banc ABC mobile application. Payment for train tickets has never been this easier',
			'expanded':false
			},
			{
			'id' : 10,
			'title' : 'Pay Merchant',
			'text' : 'Pay for services and goods by using our Merchant payment tool.\n\nTo use this tool, the merchant initiates a payment after which the customer completes the payment effecting the transfer of funds from customers account to merchant',
			'expanded':false
			},
			{
			'id' : 11,
			'title' : 'Pay School Fees',
			'text' : 'Pay school fees of your wards and children directly from your bank account using Banc ABC mobile application. Schools available for payment of fees are registered on the Shikola platform.\n\nTo pay a wards fees, you require the students identification number as provided by the school.',
			'expanded':false
			},
			{
			'id' : 12,
			'title' : 'Loan Applications & Repayments',
			'text' : 'Apply and pay back loans easily. Banc ABC mobile gives you the opportunity to monitor your loans so you dont miss out on paying back at expected timelines',
			'expanded':false
			},
			{
			'id' : 13,
			'title' : 'Request Cheques & Card',
			'text' : 'Request for a cheque book or electronic card using the Banc ABC mobile application. On applying, you will be notified when to collect your cheque book or electronic card at your specified collection center',
			'expanded':false
			}
		];
	}
	
	expandItem(item){
		
		
		this.itemslist.forEach(function(arrayItem){
			console.log(item);
			console.log(arrayItem);
			if(item.id==arrayItem.id)
			{
				if(item.expanded)
				{
					item.expanded = false;
				}
				else
				{
					item.expanded = true;
				}
			}
			else
			{
				arrayItem.expanded = false;
			}
		
		});
		/*this.itemslist.map((listItem) => {
	 
			if(item == listItem){
				listItem.expanded = !listItem.expanded;
			} else {
				listItem.expanded = false;
			}

			return listItem;

		});*/
	}
  
  
	gotofaq(key)
	{
		switch(key)
		{
			case 'accounts':
				var modalPage = this.modalCtrl.create('FaqAccountsModalPage');
				modalPage.onDidDismiss((data) => {
					console.log(data);
				});
				modalPage.present();
				break;
			case 'mini-statement':
				var modalPage = this.modalCtrl.create('FaqMiniStatementModalPage');
				modalPage.onDidDismiss((data) => {
					console.log(data);
				});
				modalPage.present();
				break;
			case 'internal-funds-transfer':
				var modalPage = this.modalCtrl.create('FaqInternalFundsTransferModalPage');
				modalPage.onDidDismiss((data) => {
					console.log(data);
				});
				modalPage.present();
				break;
			case 'funds-transfer-other-banks':
				var modalPage = this.modalCtrl.create('FaqFundsTransferOtherBanksModalPage');
				modalPage.onDidDismiss((data) => {
					console.log(data);
				});
				modalPage.present();
				break;
			case 'funds-transfer-subsidiary':
				var modalPage = this.modalCtrl.create('FaqFundsTransferSubsidiaryModalPage');
				modalPage.onDidDismiss((data) => {
					console.log(data);
				});
				modalPage.present();
				break;
			case 'funds-transfer-intl':
				var modalPage = this.modalCtrl.create('FaqIntlTransferModalPage');
				modalPage.onDidDismiss((data) => {
					console.log(data);
				});
				modalPage.present();
				break;
			case 'airtime-topup':
				var modalPage = this.modalCtrl.create('FaqAirtimeTopUpModalPage');
				modalPage.onDidDismiss((data) => {
					console.log(data);
				});
				modalPage.present();
				break;
			case 'flight-tickets':
				var modalPage = this.modalCtrl.create('FaqFlightTicketsModalPage');
				modalPage.onDidDismiss((data) => {
					console.log(data);
				});
				modalPage.present();
				break;
			case 'train-tickets':
				var modalPage = this.modalCtrl.create('FaqTrainTicketsModalPage');
				modalPage.onDidDismiss((data) => {
					console.log(data);
				});
				modalPage.present();
				break;
			case 'pay-merchant':
				var modalPage = this.modalCtrl.create('FaqPayMerchantModalPage');
				modalPage.onDidDismiss((data) => {
					console.log(data);
				});
				modalPage.present();
				break;
			case 'pay-school-fees':
				var modalPage = this.modalCtrl.create('FaqPaySchoolFeesModalPage');
				modalPage.onDidDismiss((data) => {
					console.log(data);
				});
				modalPage.present();
				break;
			case 'loan-applications':
				var modalPage = this.modalCtrl.create('FaqLoanApplicationsModalPage');
				modalPage.onDidDismiss((data) => {
					console.log(data);
				});
				modalPage.present();
				break;
			case 'request-cheques-cards':
				var modalPage = this.modalCtrl.create('FaqRequestChequeCardModalPage');
				modalPage.onDidDismiss((data) => {
					console.log(data);
				});
				modalPage.present();
				break;
		}
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
