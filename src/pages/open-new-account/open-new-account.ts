import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, Platform, LoadingController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

/*import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';*/

import { AngularFireAuth } from 'angularfire2/auth';
//import { LoadingProvider } from '../../providers/loading/loading';
import { LoginPage } from '../login/login';

/**
 * Generated class for the OpenNewAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-open-new-account',
  templateUrl: 'open-new-account.html',
})
export class OpenNewAccountPage {
	openNewAccountData = { first_name: '', last_name: '', other_name: '', national_id_number: '', mobile_number: '', house_address: '', house_address_province: '', house_address_district: '' };
	openNewAccountForm : FormGroup;
	first_name: AbstractControl;
	last_name: AbstractControl;
	other_name: AbstractControl;
	national_id_number: AbstractControl;
	mobile_number: AbstractControl;
	house_address: AbstractControl;
	house_address_province: AbstractControl;
	house_address_district: AbstractControl;

	//, public camera: Camera, public file: File, public filePath: FilePath, public loadingProvider: LoadingProvider
	constructor(public platform: Platform, public actionSheetCtrl: ActionSheetController, public storage: Storage, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams){
		this.openNewAccountForm = this.fb.group({
			'first_name' : [null, Validators.compose([Validators.required])],
			'last_name': [null, Validators.compose([Validators.required])],
			'other_name': [null, Validators.compose([])],
			'national_id_number': [null, Validators.compose([Validators.required])],
			'mobile_number': [null, Validators.compose([Validators.required])],
			'house_address': [null, Validators.compose([Validators.required])],
			'house_address_province': [null, Validators.compose([Validators.required])],
			'house_address_district': [null, Validators.compose([Validators.required])]
		});

        this.first_name = this.openNewAccountForm.controls['first_name'];
        this.last_name = this.openNewAccountForm.controls['last_name'];
        this.other_name = this.openNewAccountForm.controls['other_name'];
        this.national_id_number = this.openNewAccountForm.controls['national_id_number'];
        this.mobile_number = this.openNewAccountForm.controls['mobile_number'];
        this.house_address = this.openNewAccountForm.controls['house_address'];
        this.house_address_province = this.openNewAccountForm.controls['house_address_province'];
        this.house_address_district = this.openNewAccountForm.controls['house_address_district'];
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad openNewAccount');
	}
  
	doRegisterStepOne(regData){
		this.navCtrl.setRoot(OpenNewAccountPage);
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
