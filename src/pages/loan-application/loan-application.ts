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
//import { LoadingProvider } from '../../providers/loading/loading';
import { LoginPage } from '../login/login';
import { LoansPage } from '../loans/loans';

/**
 * Generated class for the LoanApplicationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
interface LoanApplicationRespInt{
	status: any;
	list: any;
	response_msg: any;
	sourcelist: any;
	total: any;
	interest: any;
}



@IonicPage()
@Component({
  selector: 'page-loan-application',
  templateUrl: 'loan-application.html',
})
export class LoanApplicationPage {

	loanApplicationData = { account: '', amount: '', loan_period: '', narration: '', pin: ''  };
	loanApplicationForm : FormGroup;
	account: AbstractControl;
	amount: AbstractControl;
	loan_period: AbstractControl;
	narration: AbstractControl;
	pin: AbstractControl;
	amount_payable: any = 0.00;
	interest_incured: any = 0.00;
	accountlist: any = [];
	token: any;
	loading: any;

	
	//, public camera: Camera, public file: File, public filePath: FilePath,public loadingProvider: LoadingProvider
	constructor(public platform: Platform, public storage: Storage, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: HttpClient, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams){
		this.loanApplicationForm = this.fb.group({
			'account' : [null, Validators.compose([Validators.required])],
			'amount': [null, Validators.compose([Validators.required])],
			'loan_period': [null, Validators.compose([Validators.required])],
			'narration': [null, Validators.compose([])],
			'pin': [null, Validators.compose([Validators.required])]
		});

        this.account = this.loanApplicationForm.controls['account'];
        this.amount = this.loanApplicationForm.controls['amount'];
        this.loan_period = this.loanApplicationForm.controls['loan_period'];
        this.narration = this.loanApplicationForm.controls['narration'];
        this.pin = this.loanApplicationForm.controls['pin'];
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoanApplicationPage');
		this.storage.get('zambia_bank_customer_accounts').then((val) => {
			console.log(val);
			this.accountlist = JSON.parse(val);
		});
	}
  
	doApplyForLoan(regData){
		console.log(this.loanApplicationData);
		this.storage.get('zambia_bank_customer_token').then((val) => {
			this.token = val;
			
			let header = new HttpHeaders();
			header = header.set('Content-Type', 'application/json; charset=utf-8');
			header = header.set('Accept', 'application/json');
			header = header.set('Authorization', 'Bearer ' + this.token);
			
			
			const httpOptions = {headers: header};
			var parameter = JSON.stringify({account:this.loanApplicationData.account, amount:this.loanApplicationData.amount, loan_period:this.loanApplicationData.loan_period, 
				narration:this.loanApplicationData.narration, pin:this.loanApplicationData.pin });
			console.log(parameter);
				
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/loans/apply-for-loan";
			this.loading = this.loadingCtrl.create({
				content: 'Loading View. Please wait...'
			});
			this.loading.present();
			this.http.post<LoanApplicationRespInt>(url, parameter, httpOptions).subscribe(
				res1 => {
					console.log(res1);
					this.loading.dismiss();
					if(res1.status==1)
					{
						let alert1 = this.alertCtrl.create({
							title: 'Loan Application',
							subTitle: res1.response_msg,
							buttons: [{
								text: 'Ok',
								role: 'ok',
								handler: () => {
									console.log('Valid 1');
									this.navCtrl.setRoot(LoansPage);
								}
							}]
						});
						alert1.present();
					}
					else
					{
						let alert1 = this.alertCtrl.create({
							title: 'Loan Application',
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
	
	onSourceChange()
	{
		//selectedValue: any
		//console.log('Selected', selectedValue);
		console.log('amount', this.loanApplicationData.amount);
		console.log('loan_period', this.loanApplicationData.loan_period);
		
		let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/get-loan-application-returns/" + this.loanApplicationData.amount + "/" + this.loanApplicationData.loan_period;
		this.http.get<LoanApplicationRespInt>(url).subscribe(
			res => {
				let status: any = null;
				status = res.status;
				console.log(res);
				console.log(status);
				if(res.status==1)
				{
					this.amount_payable = res.total;
					this.interest_incured = res.interest;
				}
				else
				{
					this.amount_payable = res.total;
					this.interest_incured = res.interest
				}
			},
			err => {
			  console.log('Error occured');
			}
		);
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
