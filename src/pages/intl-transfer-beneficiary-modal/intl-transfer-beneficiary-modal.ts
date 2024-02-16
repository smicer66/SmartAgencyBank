import { Component } from '@angular/core';
import { ViewController, ModalController, IonicPage, NavController, NavParams, ToastController, ActionSheetController, Platform, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from "@ionic/storage";
/*import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';*/
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
//import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the IntlTransferBeneficiaryModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intl-transfer-beneficiary-modal',
  templateUrl: 'intl-transfer-beneficiary-modal.html',
})
export class IntlTransferBeneficiaryModalPage {

	intlFundsTransferBeneficiaryData = { iban_yes: false,  beneficiary_name: '', beneficiary_iban: '', beneficiary_address: '', beneficiary_bank_routing_sort_code: '', 
		beneficiary_swift_code: '',  beneficiary_account_number: '', beneficiary_bank_name: '', beneficiary_bank_address: '', 
		beneficiary_bank_country: ''};
	intlFundsTransferBeneficiaryForm : FormGroup;
	iban_yes: AbstractControl;
	beneficiary_name: AbstractControl;
	beneficiary_iban: AbstractControl;
	beneficiary_address: AbstractControl;
	beneficiary_bank_routing_sort_code: AbstractControl;
	beneficiary_swift_code: AbstractControl;
	beneficiary_account_number: AbstractControl;
	beneficiary_bank_name: AbstractControl;
	beneficiary_bank_address: AbstractControl;
	beneficiary_bank_country: AbstractControl;
	
	iban_yes_val : any = false;
	modalPage: any;
	
	
	//, public camera: Camera, public file: File, public filePath: FilePath,public loadingProvider: LoadingProvider
	constructor(public modalCtrl: ModalController, public viewCtrl : ViewController, public storage: Storage, public loadingCtrl: LoadingController, public platform: Platform, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
		this.intlFundsTransferBeneficiaryForm = this.fb.group({
			'iban_yes' : [null, Validators.compose([Validators.required])],
			'beneficiary_name' : [null, Validators.compose([Validators.required])],
			'beneficiary_iban': [null, Validators.compose([Validators.required])],
			'beneficiary_address': [null, Validators.compose([])],
			'beneficiary_bank_routing_sort_code': [null, Validators.compose([Validators.required])],
			'beneficiary_swift_code' : [null, Validators.compose([Validators.required])],
			'beneficiary_account_number': [null, Validators.compose([Validators.required])],
			'beneficiary_bank_name': [null, Validators.compose([])],
			'beneficiary_bank_address': [null, Validators.compose([Validators.required])],
			'beneficiary_bank_country' : [null, Validators.compose([Validators.required])]
		});

		this.iban_yes = this.intlFundsTransferBeneficiaryForm.controls['iban_yes'];
        this.beneficiary_name = this.intlFundsTransferBeneficiaryForm.controls['beneficiary_name'];
        this.beneficiary_iban = this.intlFundsTransferBeneficiaryForm.controls['beneficiary_iban'];
        this.beneficiary_address = this.intlFundsTransferBeneficiaryForm.controls['beneficiary_address'];
        this.beneficiary_bank_routing_sort_code = this.intlFundsTransferBeneficiaryForm.controls['beneficiary_bank_routing_sort_code'];
		this.beneficiary_swift_code = this.intlFundsTransferBeneficiaryForm.controls['beneficiary_swift_code'];
        this.beneficiary_account_number = this.intlFundsTransferBeneficiaryForm.controls['beneficiary_account_number'];
        this.beneficiary_bank_name = this.intlFundsTransferBeneficiaryForm.controls['beneficiary_bank_name'];
        this.beneficiary_bank_address = this.intlFundsTransferBeneficiaryForm.controls['beneficiary_bank_address'];
        this.beneficiary_bank_country = this.intlFundsTransferBeneficiaryForm.controls['beneficiary_bank_country'];
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BuypayUtilityDataPage');
		this.intlFundsTransferBeneficiaryData.iban_yes = false;
	}
	
	
	openIntlTransferBeneficiaryModal(){
		this.modalPage = this.modalCtrl.create('IntlTransferBeneficiaryModalPage');
		this.modalPage.present();
	}
	
	closeIntlFundsTransferBeneficiaryModal(){
		this.viewCtrl.dismiss({beneficiaryData:this.intlFundsTransferBeneficiaryData});
	}
	
	
	onSourceChange(selectedValue: any)
	{
		console.log(this.intlFundsTransferBeneficiaryData.iban_yes);
		if(this.intlFundsTransferBeneficiaryData.iban_yes)
		{
			this.iban_yes_val = true;
		}
		else
		{
			this.iban_yes_val = false;
		}
	}
	
	doHandleBeneficiary(intlFundsTransferBeneficiaryData)
	{
		console.log(this.intlFundsTransferBeneficiaryData);
		this.viewCtrl.dismiss({beneficiaryData:this.intlFundsTransferBeneficiaryData});
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
