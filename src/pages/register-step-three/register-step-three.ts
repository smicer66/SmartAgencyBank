import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/take';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/*import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';*/

import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
//import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the RegisterStepThreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-step-three',
  templateUrl: 'register-step-three.html',
})
export class RegisterStepThreePage {

	registerStepThreeData = { username: '', password: '', confirm_password: '' };
	account_number_val: any = '';
	authentication_code_val: any = '';
	registerStepThreePageForm : FormGroup;
	username: AbstractControl;
	password: AbstractControl;
	confirm_password: AbstractControl;
	loading: any;
	
	//, public camera: Camera, public file: File, public filePath: FilePath,public loadingProvider: LoadingProvider
	constructor(public platform: Platform, public loadingCtrl: LoadingController, public http: HttpClient, public storage: Storage, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
		this.registerStepThreePageForm = this.fb.group({
			'username' : [null, Validators.compose([Validators.required])],
			'password': [null, Validators.compose([Validators.required])],
			'confirm_password': [null, Validators.compose([Validators.required])]
		});
		/**/
		this.account_number_val = navParams.get('account_number_');
		this.authentication_code_val = navParams.get('authentication_code_');
		this.username = this.registerStepThreePageForm.controls['username'];
        this.password = this.registerStepThreePageForm.controls['password'];
        this.confirm_password = this.registerStepThreePageForm.controls['confirm_password'];
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad RegisterStepThreePage');
	}
  
	doRegisterStepThree(registerStepThreeData){
		console.log(registerStepThreeData);
		this.navCtrl.setRoot(RegisterStepThreePage);
		var parameter = JSON.stringify({account_number:this.account_number_val, authentication_code:this.authentication_code_val, username: registerStepThreeData.username, password: registerStepThreeData.password, confirm_password: registerStepThreeData.confirm_password });
		console.log(parameter);
		let header = new HttpHeaders();
		header = header.set('Content-Type', 'application/json; charset=utf-8');
		header = header.set('Accept', 'application/json');
		
		const httpOptions = {headers: header};
		this.loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		this.loading.present();
		this.http.post<AccountVerify>("http://bankmobileapp.syncstatenigeria.com/api/v1/auth/register-step-three", parameter, httpOptions).subscribe(
			res => {
				this.loading.dismiss();
				let status: any = null;
				status = res.status;
				console.log(res);
				console.log(status);
				if(status==1)
				{
					let accounts = [];
					accounts.push(res.account_number);
					this.storage.set('zambia_bank_customer_accounts', JSON.stringify(accounts));
					
					let alert = this.alertCtrl.create({
						title: 'Account Verification',
						subTitle: res.response_msg,
						buttons: [{
							text: 'Ok',
							role: 'ok',
							handler: () => {
								console.log('Valid 1');
								this.navCtrl.setRoot(LoginPage, {account_number_: this.account_number_val});
							}
						}]
					});
					alert.present();
					
				}
				else
				{
					console.log(-1);
					let alert = this.alertCtrl.create({
						title: 'Account Verification',
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
	}

}



interface AccountVerify{
	status: string;
	response_msg: string;
	account_number: string;
	reg_code: string;
}