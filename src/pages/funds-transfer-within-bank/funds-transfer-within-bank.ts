import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/take';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/*import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';*/
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { FundsTransferPage } from '../funds-transfer/funds-transfer';
//import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the FundsTransferWithinBankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
interface FundsTransferRespInt{
	status: any;
	list: any;
	response_msg: any;
	total: any;
}



@IonicPage()
@Component({
  selector: 'page-funds-transfer-within-bank',
  templateUrl: 'funds-transfer-within-bank.html',
})
export class FundsTransferWithinBankPage {
	ftWithinFormData = { account: '', to_account: '', amount: '', pin: '', narration: '' };
	ftWithinForm : FormGroup;
	account: AbstractControl;
	to_account: AbstractControl;
	amount: AbstractControl;
	narration: AbstractControl;
	pin: AbstractControl;
	
	accountlist: any;
	token: any;
	loading: any;
	
	
	//, public file: File, public filePath: FilePath,public loadingProvider: LoadingProvider, public camera: Camera
	constructor(public platform: Platform,  public storage: Storage, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: HttpClient, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
		this.ftWithinForm = this.fb.group({
			'account' : [null, Validators.compose([Validators.required])],
			'to_account' : [null, Validators.compose([Validators.required])],
			'amount': [null, Validators.compose([Validators.required])],
			'narration': [null, Validators.compose([])],
			'pin': [null, Validators.compose([Validators.required])]
		});

        this.account = this.ftWithinForm.controls['account'];
        this.to_account = this.ftWithinForm.controls['to_account'];
        this.amount = this.ftWithinForm.controls['amount'];
        this.narration = this.ftWithinForm.controls['narration'];
        this.pin = this.ftWithinForm.controls['pin'];
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BuypayUtilityDataPage');
		this.storage.get('zambia_bank_customer_accounts').then((val) => {
			console.log(val);
			this.accountlist = JSON.parse(val);
		});
	}
	
	
	doFundsTransfer(ftWithinFormData)
	{
		console.log(ftWithinFormData);
		this.storage.get('zambia_bank_customer_token').then((val) => {
			this.token = val;
			
			let header = new HttpHeaders();
			header = header.set('Content-Type', 'application/json; charset=utf-8');
			header = header.set('Accept', 'application/json');
			header = header.set('Authorization', 'Bearer ' + this.token);
			
			
			const httpOptions = {headers: header};
			var parameter = JSON.stringify({account:this.ftWithinFormData.account, to_account:this.ftWithinFormData.to_account, selectTransferType:'BTW',
				amount:this.ftWithinFormData.amount, narration:this.ftWithinFormData.narration, pin:this.ftWithinFormData.pin });
			console.log(parameter);
				
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/funds-transfer/funds-transfer-within-bank";
			
			this.loading = this.loadingCtrl.create({
				content: 'Loading View. Please wait...'
			});
			this.loading.present();
			this.http.post<FundsTransferRespInt>(url, parameter, httpOptions).subscribe(
				res1 => {
					console.log(res1);
					this.loading.dismiss();
					if(res1.status==1)
					{
						let alert1 = this.alertCtrl.create({
							title: 'Funds Transfer',
							subTitle: res1.response_msg,
							buttons: [{
								text: 'Ok',
								role: 'ok',
								handler: () => {
									console.log('Valid 1');
									this.navCtrl.setRoot(FundsTransferPage);
								}
							}]
						});
						alert1.present();
					}
					else
					{
						let alert1 = this.alertCtrl.create({
							title: 'Funds Transfer',
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
