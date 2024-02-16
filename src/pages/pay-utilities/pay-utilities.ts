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
 * Generated class for the PayUtilitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface UtilityListRespInt{
	status: any;
	list: any;
	response_msg: any;
	sourcelist: any;
}

@IonicPage()
@Component({
  selector: 'page-pay-utilities',
  templateUrl: 'pay-utilities.html',
})
export class PayUtilitiesPage {

	payUtilityData = { account: '', bill_provider: '', provider_id_number: '', amount: '', pin: '', narration: '' };
	payUtilityDataForm : FormGroup;
	bill_provider: AbstractControl;
	provider_id_number: AbstractControl;
	amount: AbstractControl;
	narration: AbstractControl;
	pin: AbstractControl;
	account: AbstractControl;
	
	utilityproviderlist: any = [];
	accountlist: any = [];
	token: any;
	loading: any;
	
	//, public camera: Camera, public file: File, public filePath: FilePath,public loadingProvider: LoadingProvider
	constructor(public platform: Platform, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public storage: Storage, public http: HttpClient, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
		this.payUtilityDataForm = this.fb.group({
			'bill_provider' : [null, Validators.compose([Validators.required])],
			'provider_id_number': [null, Validators.compose([Validators.required])],
			'amount': [null, Validators.compose([Validators.required])],
			'narration': [null, Validators.compose([])],
			'pin': [null, Validators.compose([Validators.required])],
			'account': [null, Validators.compose([Validators.required])]
		});

        this.bill_provider = this.payUtilityDataForm.controls['bill_provider'];
        this.provider_id_number = this.payUtilityDataForm.controls['provider_id_number'];
        this.amount = this.payUtilityDataForm.controls['amount'];
        this.narration = this.payUtilityDataForm.controls['narration'];
        this.pin = this.payUtilityDataForm.controls['pin'];
        this.account = this.payUtilityDataForm.controls['account'];
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BuypayUtilityDataPage');
		this.storage.get('zambia_bank_customer_accounts').then((val) => {
			console.log(val);
			this.accountlist = JSON.parse(val);
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/get-utility-providers";
			this.loading = this.loadingCtrl.create({
				content: 'Loading View. Please wait...'
			});
			this.loading.present();
			this.http.get<UtilityListRespInt>(url).subscribe(
				res => {
					this.loading.dismiss();
					let status: any = null;
					status = res.status;
					console.log(res);
					console.log(status);
					if(res.status==1)
					{
						this.utilityproviderlist = res.list;
					}
				},
				err => {
					this.loading.dismiss();
				  console.log('Error occured');
				}
			);
		});
	}
	
	
	
	doPayUtility(payUtilityData)
	{
		console.log(payUtilityData);
		this.storage.get('zambia_bank_customer_token').then((val) => {
			this.token = val;
			
			let header = new HttpHeaders();
			header = header.set('Content-Type', 'application/json; charset=utf-8');
			header = header.set('Accept', 'application/json');
			header = header.set('Authorization', 'Bearer ' + this.token);
			
			
			const httpOptions = {headers: header};
			var parameter = JSON.stringify({account:this.payUtilityData.account, bill_provider:this.payUtilityData.bill_provider, provider_id_number:this.payUtilityData.provider_id_number, 
				amount:this.payUtilityData.amount, narration:this.payUtilityData.narration, pin:this.payUtilityData.pin });
			console.log(parameter);
				
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/billing/pay-for-utility-bill";
			this.loading = this.loadingCtrl.create({
				content: 'Please wait...'
			});
			this.loading.present();
			this.http.post<UtilityListRespInt>(url, parameter, httpOptions).subscribe(
				res1 => {
					console.log(res1);
					this.loading.dismiss();
					if(res1.status==1)
					{
						let alert1 = this.alertCtrl.create({
							title: 'Utility Bill Payment',
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
							title: 'Utility Bill Payment',
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
		this.token = null;
		loading.dismiss();
		this.navCtrl.setRoot(LoginPage);
		
	}


}
