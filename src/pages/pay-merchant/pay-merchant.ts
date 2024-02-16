import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, AlertController, Platform, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/take';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/*import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';*/

import { AngularFireAuth } from 'angularfire2/auth';

import { BillPaymentPage } from '../bill-payment/bill-payment';
import { LoginPage } from '../login/login';
//import { LoadingProvider } from '../../providers/loading/loading';


interface PayMerchantRespInt{
	status: any;
	response_msg: any;
}

/**
 * Generated class for the PayMerchantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay-merchant',
  templateUrl: 'pay-merchant.html',
})
export class PayMerchantPage {
	
	payMerchantData = { account: '', merchant_code: '', transaction_code: '', pin: '' };
	payMerchantForm : FormGroup;
	merchant_code: AbstractControl;
	transaction_code: AbstractControl;
	pin: AbstractControl;
	account: AbstractControl;
	accountlist: any;
	
	token: any;
	loading: any;
	
	
	//, public camera: Camera, public file: File, public filePath: FilePath,public loadingProvider: LoadingProvider
	constructor(public platform: Platform, public storage: Storage, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: HttpClient, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
		this.payMerchantForm = this.fb.group({
			'merchant_code' : [null, Validators.compose([Validators.required])],
			'transaction_code': [null, Validators.compose([])],
			'pin': [null, Validators.compose([Validators.required])],
			'account': [null, Validators.compose([Validators.required])]
		});

        this.merchant_code = this.payMerchantForm.controls['merchant_code'];
        this.transaction_code = this.payMerchantForm.controls['transaction_code'];
        this.pin = this.payMerchantForm.controls['pin'];
        this.account = this.payMerchantForm.controls['account'];
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PayMerchantPage');
		this.storage.get('zambia_bank_customer_accounts').then((val) => {
			this.accountlist = JSON.parse(val);
		});
	}

	
	initiateMerchantPayment(payMerchantData)
	{
		this.storage.get('zambia_bank_customer_token').then((val) => {
			this.token = val;
			let header = new HttpHeaders();
			header = header.set('Content-Type', 'application/json; charset=utf-8');
			header = header.set('Accept', 'application/json');
			
			const httpOptions = {headers: header};
			var parameter = JSON.stringify({merchantCode:payMerchantData.merchant_code, transactionCode:payMerchantData.transaction_code});
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/billing/initiatemerchantpayment";
			this.loading = this.loadingCtrl.create({
				content: 'Initiating Payment. Please wait...'
			});
			this.loading.present();
			this.http.post<PayMerchantRespInt>(url, parameter, httpOptions).subscribe(
				res => {
					this.loading.dismiss();
					let status: any = null;
					status = res.status;
					console.log(res);
					console.log(status);
					if(res.status==1)
					{
						let alert = this.alertCtrl.create({
							title: 'Pay Merchant Confirmation - 2/2',
							message: res.response_msg,
							inputs: [
								{
									name: 'pin',
									placeholder: 'Enter Your 4-digit Pin',
									type: 'password'
								}
							],
							buttons: [{
									text: 'Confirm Payment',
									role: 'ok',
									handler: data => {
										console.log('confirm payment');
										let header = new HttpHeaders();
										header = header.set('Content-Type', 'application/json; charset=utf-8');
										header = header.set('Accept', 'application/json');
										header = header.set('Authorization', 'Bearer ' + this.token);
										
										const httpOptions = {headers: header};
										var parameter = JSON.stringify({merchantCode:payMerchantData.merchant_code, pin:data.pin, account:payMerchantData.account, 
											transactionCode:payMerchantData.transaction_code });
										console.log(parameter);
											
										let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/billing/payMerchantConfirm";
										
										this.loading = this.loadingCtrl.create({
											content: 'Loading View. Please wait...'
										});
										this.loading.present();
										this.http.post<PayMerchantRespInt>(url, parameter, httpOptions).subscribe(
											res1 => {
												this.loading.dismiss();
												console.log(res1);
												if(res1.status==1)
												{
													let alert1 = this.alertCtrl.create({
														title: 'Pay Merchant',
														subTitle: res1.response_msg,
														buttons: [{
															text: 'Ok',
															role: 'ok',
															handler: () => {
																console.log('Valid 1');
																this.navCtrl.setRoot(BillPaymentPage);
															}
														}]
													});
													alert1.present();
												}
												else
												{
													let alert1 = this.alertCtrl.create({
														title: 'Pay Merchant',
														subTitle: res1.response_msg,
														buttons: ['Dismiss']
													});
													alert1.present();
												}
											},
											err => {
												this.loading.dismiss();
											  console.log('Error occured');
											}
										);
										this.navCtrl.setRoot(BillPaymentPage);
									}
								}
							]
						});
						alert.present();
					}
					else
					{
						console.log(-1);
						let alert = this.alertCtrl.create({
							title: 'Pay Merchant',
							subTitle: res.response_msg,
							buttons: ['Dismiss']
						});
						alert.present();
					}
				},
				err => {
					this.loading.dismiss();
				  console.log('Error occured');
				}
			);
		});
	}
	
	
	
	
	logout()
	{
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		loading.present();
		this.storage.remove('zambia_bank_customer_token');
		this.storage.remove('zambia_bank_loggedInUser');
		this.token = null;
		loading.dismiss();
		this.navCtrl.setRoot(LoginPage);
		
	}
}

