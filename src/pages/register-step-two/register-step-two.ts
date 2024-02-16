import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/take';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/*import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';*/

import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterStepThreePage } from '../register-step-three/register-step-three';
//import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the RegisterStepTwoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-step-two',
  templateUrl: 'register-step-two.html',
})
export class RegisterStepTwoPage {
	
	registerStepTwoData = { account_number: '', authentication_code: '' };
	account_number_val: any = '';
	reg_code: any = '';
	registerStepTwoPageForm : FormGroup;
	account_number: AbstractControl;
	authentication_code: AbstractControl;
	
	loading: any;

	
	//, public camera: Camera, public file: File, public filePath: FilePath,public loadingProvider: LoadingProvider
	constructor(public platform: Platform, public http: HttpClient, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams){
		this.registerStepTwoPageForm = this.fb.group({
			'account_number' : [null, Validators.compose([Validators.required])],
			'authentication_code': [null, Validators.compose([Validators.required])]
		});

        this.account_number = this.registerStepTwoPageForm.controls['account_number'];
        this.authentication_code = this.registerStepTwoPageForm.controls['authentication_code'];
		this.account_number_val = navParams.get('account_number_');
		this.reg_code = navParams.get('reg_code_');
		console.log(navParams);
		console.log("this.account_number_val" + this.account_number_val);
		this.account_number.setValue(this.account_number_val);
		this.authentication_code.setValue(this.reg_code);
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterStepTwoPage');
  }
  
	doRegisterStepTwo(registerStepTwoData){
		console.log(registerStepTwoData);
		this.navCtrl.setRoot(RegisterStepThreePage);
		var parameter = JSON.stringify({account_number:registerStepTwoData.account_number, authentication_code:registerStepTwoData.authentication_code, });
		console.log(parameter);
		let header = new HttpHeaders();
		header = header.set('Content-Type', 'application/json; charset=utf-8');
		header = header.set('Accept', 'application/json');
		
		const httpOptions = {headers: header};
		
		this.loading = this.loadingCtrl.create({
			content: 'Loading View. Please wait...'
		});
		this.loading.present();
		this.http.post<AccountVerify>("http://bankmobileapp.syncstatenigeria.com/api/v1/auth/register-step-two", parameter, httpOptions).subscribe(
			res => {
				this.loading.dismiss();
				console.log(res);
				let status: any = null;
				status = res.status;
				if(status==1)
				{
					let account_number = res.account_number;
					console.log(account_number);
					this.navCtrl.setRoot(RegisterStepThreePage, {account_number_: account_number, authentication_code_: registerStepTwoData.authentication_code});
				}
				else
				{
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
	
	doCancelRegisterStepTwo()
	{
	
	
	}

}

interface AccountVerify{
	status: string;
	response_msg: string;
	account_number: string;
	reg_code: string;
}
