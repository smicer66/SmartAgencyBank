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

import { LoginPage } from '../login/login';
import { BillPaymentPage } from '../bill-payment/bill-payment';
//import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the BuyInternetDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface TelcoListRespInt{
	status: any;
	list: any;
	response_msg: any;
	sourcelist: any;
}

@IonicPage()
@Component({
  selector: 'page-buy-internet-data',
  templateUrl: 'buy-internet-data.html',
})
export class BuyInternetDataPage {

  internetData = { account: '', internet_provider: '', subscription_data: '', mobile_number: '', pin: '', narration: '' };
	internetDataForm : FormGroup;
	account: AbstractControl;
	internet_provider: AbstractControl;
	subscription_data: AbstractControl;
	mobile_number: AbstractControl;
	narration: AbstractControl;
	pin: AbstractControl;
	
	telcolist: any;
	accountlist: any;
	token: any;
	subscription_typelist: any = [];
	
	loading: any;
	
	//, public camera: Camera, public file: File, public filePath: FilePath, public loadingProvider: LoadingProvider
	constructor(public platform: Platform, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public storage: Storage, public http: HttpClient, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
		this.internetDataForm = this.fb.group({
			'account' : [null, Validators.compose([Validators.required])],
			'internet_provider' : [null, Validators.compose([Validators.required])],
			'subscription_data': [null, Validators.compose([Validators.required])],
			'mobile_number': [null, Validators.compose([Validators.required])],
			'narration': [null, Validators.compose([])],
			'pin': [null, Validators.compose([Validators.required])]
		});

        this.account = this.internetDataForm.controls['account'];
		this.internet_provider = this.internetDataForm.controls['internet_provider'];
        this.subscription_data = this.internetDataForm.controls['subscription_data'];
        this.mobile_number = this.internetDataForm.controls['mobile_number'];
        this.narration = this.internetDataForm.controls['narration'];
        this.pin = this.internetDataForm.controls['pin'];
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BuyInternetDataPage');
		this.storage.get('zambia_bank_customer_accounts').then((val) => {
			console.log(val);
			this.accountlist = JSON.parse(val);
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/get-telco-providers";
			
			this.loading = this.loadingCtrl.create({
				content: 'Loading View. Please wait...'
			});
			this.loading.present();
			
			this.http.get<TelcoListRespInt>(url).subscribe(
				res => {
					this.loading.dismiss();
					let status: any = null;
					status = res.status;
					console.log(res);
					console.log(status);
					if(res.status==1)
					{
						this.telcolist = res.list;
					}
				},
				err => {
					this.loading.dismiss();
				  console.log('Error occured');
				}
			);
		});
	}

	onSourceChange(selectedValue: any)
	{
		console.log('Selected', selectedValue);
		
		let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/get-telco-subscription-types/" + selectedValue;
		this.http.get<TelcoListRespInt>(url).subscribe(
			res => {
				let status: any = null;
				status = res.status;
				console.log(res);
				console.log(status);
				if(res.status==1)
				{
					this.subscription_typelist = res.list;
				}
				else
				{
					let alert = this.alertCtrl.create({
						title: 'Internet Data Subscription',
						message: "No data subscription packages available for this telco",
						buttons: ['OK']
					});
					alert.present();
				}
			},
			err => {
			  console.log('Error occured');
			}
		);
	}
	
	
	
	doBuyInternetData(internetData)
	{
		console.log(internetData);
		this.storage.get('zambia_bank_customer_token').then((val) => {
			this.token = val;
			
			let header = new HttpHeaders();
			header = header.set('Content-Type', 'application/json; charset=utf-8');
			header = header.set('Accept', 'application/json');
			header = header.set('Authorization', 'Bearer ' + this.token);
			
			
			const httpOptions = {headers: header};
			var parameter = JSON.stringify({account:this.internetData.account, internet_provider:this.internetData.internet_provider, subscription_data:this.internetData.subscription_data, 
				mobile_number:this.internetData.mobile_number, narration:this.internetData.narration, pin:this.internetData.pin });
			console.log(parameter);
				
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/billing/pay-for-telco-internet-data";
			this.loading = this.loadingCtrl.create({
				content: 'Please wait...'
			});
			this.loading.present();
			
			this.http.post<TelcoListRespInt>(url, parameter, httpOptions).subscribe(
				res1 => {
					console.log(res1);
					
					this.loading.dismiss();
					if(res1.status==1)
					{
						let alert1 = this.alertCtrl.create({
							title: 'Internet Data Subscription',
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
							title: 'Internet Data Subscription',
							subTitle: res1.response_msg,
							buttons: ['Dismiss']
						});
						alert1.present();
					}
				},
				err => {
					this.loading.dismiss();
					console.log('Error occured');
					this.navCtrl.setRoot(LoginPage);
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
		loading.dismiss();
		this.token = null;
		this.navCtrl.setRoot(LoginPage);
		
	}
}
