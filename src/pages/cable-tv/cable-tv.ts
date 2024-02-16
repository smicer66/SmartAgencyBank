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


interface CableTvListRespInt{
	status: any;
	list: any;
}

interface CableTvPurchaseRespInt{
	status: any;
	response_msg: any;
}


/**
 * Generated class for the CableTvPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cable-tv',
  templateUrl: 'cable-tv.html',
})
export class CableTvPage {

	cableTVData = { account: '', cable_provider: '', subscription_type: '', decoder_number: '', narration: '', pin: '' };
	cableTVForm : FormGroup;
	cable_provider: AbstractControl;
	subscription_type: AbstractControl;
	decoder_number: AbstractControl;
	narration: AbstractControl;
	pin: AbstractControl;
	account: AbstractControl;
	
	token: any;
	cable_tv_providerlist: any;
	subscriptiontypelist: any;
	accountlist: any;
	loading: any;
	
	//, public camera: Camera, public file: File, public filePath: FilePath,public loadingProvider: LoadingProvider
	constructor(public platform: Platform, public storage: Storage, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: HttpClient, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
		this.cableTVForm = this.fb.group({
			'cable_provider' : [null, Validators.compose([Validators.required])],
			'subscription_type': [null, Validators.compose([Validators.required])],
			'decoder_number': [null, Validators.compose([Validators.required])],
			'narration': [null, Validators.compose([])],
			'pin': [null, Validators.compose([Validators.required])],
			'account': [null, Validators.compose([Validators.required])]
		});

        this.cable_provider = this.cableTVForm.controls['cable_provider'];
        this.subscription_type = this.cableTVForm.controls['subscription_type'];
        this.decoder_number = this.cableTVForm.controls['decoder_number'];
        this.narration = this.cableTVForm.controls['narration'];
        this.pin = this.cableTVForm.controls['pin'];
        this.account = this.cableTVForm.controls['account'];
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CableTvPage');
		
		this.storage.get('zambia_bank_customer_accounts').then((val) => {
			this.accountlist = JSON.parse(val);
			let header = new HttpHeaders();
			header = header.set('Content-Type', 'application/json; charset=utf-8');
			header = header.set('Accept', 'application/json');
			
			const httpOptions = {headers: header};
			var parameter = JSON.stringify({});
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/get-cabletv-providers";
			
			this.loading = this.loadingCtrl.create({
				content: 'Loading View. Please wait...'
			});
			this.loading.present();
			this.http.get<CableTvListRespInt>(url).subscribe(
				res => {
					let status: any = null;
					status = res.status;
					console.log(res);
					console.log(status);
					this.loading.dismiss();
					if(res.status==1)
					{
						this.cable_tv_providerlist = res.list;
					}
				},
				err => {
					this.loading.dismiss();
				  console.log('Error occured');
				}
			);
		});
		
		
	}
	
	onNetworkChange(selectedValue: any){
		let header = new HttpHeaders();
		header = header.set('Content-Type', 'application/json; charset=utf-8');
		header = header.set('Accept', 'application/json');
		
		const httpOptions = {headers: header};
		var parameter = JSON.stringify({});
		let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/get-cabletv-subscription-type/" + selectedValue;
		this.http.get<CableTvListRespInt>(url).subscribe(
			res => {
				let status: any = null;
				status = res.status;
				console.log(res);
				console.log(status);
				if(res.status==1)
				{
					this.subscriptiontypelist = res.list;
				}
			},
			err => {
			  console.log('Error occured');
			}
		);
	}
	
	
	doPurchaseCableSubscription(cableTVData)
	{
		console.log(cableTVData);
		
		this.storage.get('zambia_bank_customer_token').then((val) => {
			this.token = val;
			console.log(this.token);
			let header = new HttpHeaders();
			header = header.set('Content-Type', 'application/json; charset=utf-8');
			header = header.set('Accept', 'application/json');
			header = header.set('Authorization', 'Bearer ' + this.token);
			
			const httpOptions = {headers: header};
			var parameter = JSON.stringify({account:cableTVData.account, cable_provider:cableTVData.cable_provider, subscription_type:cableTVData.subscription_type, 
				decoder_number:cableTVData.decoder_number, narration:cableTVData.narration, pin:cableTVData.pin });
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/billing/paysubscription";
			
			this.loading = this.loadingCtrl.create({
				content: 'Loading View. Please wait...'
			});
			this.loading.present();
			this.http.post<CableTvPurchaseRespInt>(url, parameter, httpOptions).subscribe(
				res => {
					let status: any = null;
					status = res.status;
					console.log(res);
					console.log(status);
					this.loading.dismiss();
					if(res.status==1)
					{
						let alert = this.alertCtrl.create({
							title: 'Cable TV Purchase',
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
							title: 'Cable TV Purchase',
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
		loading.dismiss();
		this.token = null;
		this.navCtrl.setRoot(LoginPage);
		
	}

}
