import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, AlertController, Platform, LoadingController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/take';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/*import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';*/

import { AngularFireAuth } from 'angularfire2/auth';
import { BillPaymentPage } from '../bill-payment/bill-payment';
import { LoginPage } from '../login/login';
//import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the MobileTopUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mobile-top-up',
  templateUrl: 'mobile-top-up.html',
})
export class MobileTopUpPage {

	mobileTopUpData = { network_provider: '', pin_pinless: '', receipient: '', pin: '', narration: '', amount: '' };
	mobileTopUpForm : FormGroup;
	network_provider: AbstractControl;
	pin_pinless: AbstractControl;
	account: AbstractControl;
	receipient: AbstractControl;
	narration: AbstractControl;
	amount: AbstractControl;
	pin: AbstractControl;
	token: any;
	accountlist: any;
	
	telcodenominations: any = [];
	loading: any;
	
	//, public camera: Camera, public file: File, public filePath: FilePath,public loadingProvider: LoadingProvider
	constructor(public platform: Platform, public storage: Storage, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: HttpClient, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
		this.mobileTopUpForm = this.fb.group({
			'network_provider' : [null, Validators.compose([Validators.required])],
			'pin_pinless': [null, Validators.compose([Validators.required])],
			'account': [null, Validators.compose([Validators.required])],
			'receipient': [null, Validators.compose([Validators.required])],
			'amount': [null, Validators.compose([Validators.required])],
			'narration': [null, Validators.compose([])],
			'pin': [null, Validators.compose([Validators.required])]
		});

        this.network_provider = this.mobileTopUpForm.controls['network_provider'];
		this.account = this.mobileTopUpForm.controls['account'];
        this.pin_pinless = this.mobileTopUpForm.controls['pin_pinless'];
        this.receipient = this.mobileTopUpForm.controls['receipient'];
        this.amount = this.mobileTopUpForm.controls['amount'];
		this.narration = this.mobileTopUpForm.controls['narration'];
        this.pin = this.mobileTopUpForm.controls['pin'];
		this.telcodenominations = [];
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MobileTopUpPage');
		this.storage.get('zambia_bank_customer_accounts').then((val) => {
			this.accountlist = JSON.parse(val);
		});
	}
	
	onNetworkChange(selectedValue: any) {
		console.log('Selected', selectedValue);
		let header = new HttpHeaders();
		header = header.set('Content-Type', 'application/json; charset=utf-8');
		header = header.set('Accept', 'application/json');
		
		const httpOptions = {headers: header};
		var parameter = JSON.stringify({});
		let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/get-telco-denominations/" + selectedValue;
		this.http.get<MobileTopUpDenomRespInt>(url).subscribe(
			res => {
				let status: any = null;
				status = res.status;
				console.log(res);
				console.log(status);
				if(res.status==1)
				{
					this.telcodenominations = res.list;
				}
				else
				{
					let alert = this.alertCtrl.create({
						title: 'Login Response',
						message: "Logging In Failed. Ensure you provide your valid passenger login details",
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
	
	
	
	doPurchaseMobileTopUp(mobileTopUpData)
	{
		console.log(mobileTopUpData);
		
		this.storage.get('zambia_bank_customer_token').then((val) => {
			this.token = val;
			console.log(this.token);
			let header = new HttpHeaders();
			header = header.set('Content-Type', 'application/json; charset=utf-8');
			header = header.set('Accept', 'application/json');
			header = header.set('Authorization', 'Bearer ' + this.token);
			
			const httpOptions = {headers: header};
			var parameter = JSON.stringify({telco:mobileTopUpData.network_provider, pin_pinless:mobileTopUpData.pin_pinless, amount:mobileTopUpData.amount, 
				receipient:mobileTopUpData.receipient, narration:mobileTopUpData.narration, pin:mobileTopUpData.pin, account_number:mobileTopUpData.account });
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/billing/topupairtime";
			this.loading = this.loadingCtrl.create({
				content: 'Please wait...'
			});
			this.loading.present();
			this.http.post<MobileTopUpRespInt>(url, parameter, httpOptions).subscribe(
				res => {
					this.loading.dismiss();
					let status: any = null;
					status = res.status;
					console.log(res);
					console.log(status);
					if(res.status==1)
					{
						let alert = this.alertCtrl.create({
							title: 'Airtime Purchase',
							message: res.response_msg,
							buttons: [{
									text: 'Ok',
									role: 'ok',
									handler: () => {
										console.log('Valid 1');
										this.navCtrl.setRoot(BillPaymentPage);
									}
								}
							]
						});
						alert.present();
					}
					else
					{
						let alert = this.alertCtrl.create({
							title: 'Airtime Purchase',
							message: res.response_msg,
							buttons: [{
									text: 'Cancel',
									role: 'ok',
									handler: () => {
										console.log('Valid 1');
										this.navCtrl.setRoot(BillPaymentPage);
									}
								},
								{
									text: 'Ok',
									role: 'ok'
								}
							]
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


interface MobileTopUpDenomRespInt{
	status: any;
	list: any;
}

interface MobileTopUpRespInt{
	status: any;
	top_up_unit:any;
	response_msg: any;
}