import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams, ToastController, ActionSheetController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/take';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/*import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';*/
import { AngularFireAuth } from 'angularfire2/auth';
import { IntlTransferBeneficiaryModalPage } from '../intl-transfer-beneficiary-modal/intl-transfer-beneficiary-modal';
//import { LoadingProvider } from '../../providers/loading/loading';
import { LoginPage } from '../login/login';
import { FundsTransferPage } from '../funds-transfer/funds-transfer';

/**
 * Generated class for the FundsTransferInternationalPage page.
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
  selector: 'page-funds-transfer-international',
  templateUrl: 'funds-transfer-international.html',
})
export class FundsTransferInternationalPage {

	intlFundsTransferData = { account: '',  receipient_account: '', currency: '', amount: '', transfer_purpose: '', 
		intermediary_bank_name: '',  intermediary_swift_code: '', intermediary_account_number: '', receipient_mobile_number: '', receipient_email_address: '', 
		additional_data: '',  pin: '', iban_yes: '',  beneficiary_name: '', beneficiary_iban: '', beneficiary_address: '', beneficiary_bank_routing_sort_code: '', 
		beneficiary_swift_code: '',  beneficiary_account_number: '', beneficiary_bank_name: '',  beneficiary_bank_address: '', beneficiary_bank_country: ''};
		
	intlFundsTransferForm : FormGroup;
	account: AbstractControl;
	receipient_account: AbstractControl;
	currency: AbstractControl;
	amount: AbstractControl;
	transfer_purpose: AbstractControl;
	intermediary_bank_name: AbstractControl;
	intermediary_swift_code: AbstractControl;
	intermediary_account_number: AbstractControl;
	receipient_mobile_number: AbstractControl;
	receipient_email_address: AbstractControl;
	additional_data: AbstractControl;
	pin: AbstractControl;
	
	accountlist: any;
	beneficiaryData: any;
	token: any;
	loading: any;
	
	
	
	//, public camera: Camera, public file: File, public filePath: FilePath,public loadingProvider: LoadingProvider
	constructor(public modalCtrl: ModalController,  public storage: Storage, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: HttpClient, public platform: Platform, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
		this.intlFundsTransferForm = this.fb.group({
			'account' : [null, Validators.compose([Validators.required])],
			'receipient_account' : [null, Validators.compose([Validators.required])],
			'currency': [null, Validators.compose([Validators.required])],
			'amount': [null, Validators.compose([])],
			'transfer_purpose': [null, Validators.compose([Validators.required])],
			'intermediary_bank_name' : [null, Validators.compose([Validators.required])],
			'intermediary_swift_code': [null, Validators.compose([Validators.required])],
			'intermediary_account_number': [null, Validators.compose([])],
			'receipient_mobile_number': [null, Validators.compose([Validators.required])],
			'receipient_email_address' : [null, Validators.compose([Validators.required])],
			'additional_data': [null, Validators.compose([])],
			'pin': [null, Validators.compose([])]
		});

		this.account = this.intlFundsTransferForm.controls['account'];
        this.receipient_account = this.intlFundsTransferForm.controls['receipient_account'];
        this.currency = this.intlFundsTransferForm.controls['currency'];
        this.amount = this.intlFundsTransferForm.controls['amount'];
        this.transfer_purpose = this.intlFundsTransferForm.controls['transfer_purpose'];
		this.intermediary_bank_name = this.intlFundsTransferForm.controls['intermediary_bank_name'];
        this.intermediary_swift_code = this.intlFundsTransferForm.controls['intermediary_swift_code'];
        this.intermediary_account_number = this.intlFundsTransferForm.controls['intermediary_account_number'];
        this.receipient_mobile_number = this.intlFundsTransferForm.controls['receipient_mobile_number'];
        this.receipient_email_address = this.intlFundsTransferForm.controls['receipient_email_address'];
		this.additional_data = this.intlFundsTransferForm.controls['additional_data'];
        this.pin = this.intlFundsTransferForm.controls['pin'];
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BuypayUtilityDataPage');
		this.storage.get('zambia_bank_customer_accounts').then((val) => {
			console.log(val);
			this.accountlist = JSON.parse(val);
		});
	}
	
	
	openIntlTransferBeneficiaryModal(){
		var modalPage = this.modalCtrl.create('IntlTransferBeneficiaryModalPage');
		modalPage.onDidDismiss((data) => {
			console.log(data);
			this.beneficiaryData = data.beneficiaryData;
			console.log(this.beneficiaryData);
			if(this.beneficiaryData.beneficiary_account_number.length>0)
			{
				this.intlFundsTransferData.receipient_account = this.beneficiaryData.beneficiary_account_number;
			}
			else if(this.beneficiaryData.beneficiary_iban.length>0)
			{
				this.intlFundsTransferData.receipient_account = this.beneficiaryData.beneficiary_iban;
			}
		});
		modalPage.present();
	}
	
	
	doFundsTransfer(intlFundsTransferData)
	{
		console.log(this.beneficiaryData);
		//console.log(this.beneficiaryData.beneficiaryData);
		console.log(intlFundsTransferData);
		this.storage.get('zambia_bank_customer_token').then((val) => {
			this.token = val;
			
			let header = new HttpHeaders();
			header = header.set('Content-Type', 'application/json; charset=utf-8');
			header = header.set('Accept', 'application/json');
			header = header.set('Authorization', 'Bearer ' + this.token);
			
			
			const httpOptions = {headers: header};
			var parameter = JSON.stringify({account:this.intlFundsTransferData.account, to_account:this.intlFundsTransferData.receipient_account, 
				currency:this.intlFundsTransferData.currency, amount:this.intlFundsTransferData.amount, transfer_purpose:this.intlFundsTransferData.transfer_purpose,  
				intermediary_bank_name:this.intlFundsTransferData.intermediary_bank_name, intermediary_swift_code:this.intlFundsTransferData.intermediary_swift_code, 
				intermediary_account_number:this.intlFundsTransferData.intermediary_account_number, receipient_mobile_number:this.intlFundsTransferData.receipient_mobile_number, 
				receipient_email_address:this.intlFundsTransferData.receipient_email_address, additional_data:this.intlFundsTransferData.additional_data, 
				pin:this.intlFundsTransferData.pin, selectTransferType:'INTL', iban_yes: this.beneficiaryData.iban_yes,  beneficiary_name: this.beneficiaryData.beneficiary_name, 
				beneficiary_iban: this.beneficiaryData.beneficiary_iban, beneficiary_address: this.beneficiaryData.beneficiary_address, 
				beneficiary_bank_routing_sort_code: this.beneficiaryData.beneficiary_bank_routing_sort_code, 
				beneficiary_swift_code: this.beneficiaryData.beneficiary_swift_code,  beneficiary_account_number: this.beneficiaryData.beneficiary_account_number, 
				beneficiary_bank_name: this.beneficiaryData.beneficiary_bank_name,  beneficiary_bank_address: this.beneficiaryData.beneficiary_bank_address, 
				beneficiary_bank_country: this.beneficiaryData.beneficiary_bank_country });
				
			console.log(parameter);
				
			this.loading = this.loadingCtrl.create({
				content: 'Please wait...'
			});
			this.loading.present();
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/funds-transfer/funds-transfer-international-bank";
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
