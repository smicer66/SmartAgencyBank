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
//import { LoadingProvider } from '../../providers/loading/loading';
import { LoginPage } from '../login/login';
import { LoansPage } from '../loans/loans';


interface LoanApplicationRespInt{
	status: any;
	list: any;
	response_msg: any;
	sourcelist: any;
	total: any;
	interest: any;
}


/**
 * Generated class for the RepayLoanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-repay-loan',
  templateUrl: 'repay-loan.html',
})
export class RepayLoanPage {

	replayLoanData = { account: '', loan: '', amount: '', narration: '', pin: '' };
	replayLoanForm : FormGroup;
	loan: AbstractControl;
	amount: AbstractControl;
	account: AbstractControl;
	narration: AbstractControl;
	pin: AbstractControl;
	
	loanlist: any = [];
	accountlist: any = [];
	loan_amount: any = 0.00;
	amount_repaid: any = 0.00;
	current_balance: any = 0.00;
	token: any;
	
	loading: any;

	
	//, public camera: Camera, public file: File, public filePath: FilePath,public loadingProvider: LoadingProvider
	constructor(public platform: Platform, public storage: Storage, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: HttpClient, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams){
		this.replayLoanForm = this.fb.group({
			'account' : [null, Validators.compose([Validators.required])],
			'loan' : [null, Validators.compose([Validators.required])],
			'amount': [null, Validators.compose([Validators.required])],
			'pin': [null, Validators.compose([Validators.required])],
			'narration': [null, Validators.compose([])]
		});

        this.loan = this.replayLoanForm.controls['loan'];
        this.amount = this.replayLoanForm.controls['amount'];
        this.account = this.replayLoanForm.controls['account'];
        this.narration = this.replayLoanForm.controls['narration'];
        this.pin = this.replayLoanForm.controls['pin'];
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad replayLoanPage');
		this.storage.get('zambia_bank_customer_accounts').then((val) => {
			console.log(val);
			this.accountlist = JSON.parse(val);
			this.storage.get('zambia_bank_customer_token').then((val) => {
				this.token = val;
				let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/get-loan-applications/" + this.token;
				this.http.get<LoanApplicationRespInt>(url).subscribe(
					res => {
						let status: any = null;
						status = res.status;
						console.log(res);
						console.log(status);
						if(res.status==1)
						{
							this.loanlist = res.list;
						}
					},
					err => {
					  console.log('Error occured');
					}
				);
			});
		});
	}
  
	doRepayLoan(replayLoanData){
		//this.navCtrl.setRoot(replayLoanPage);
		this.storage.get('zambia_bank_customer_token').then((val) => {
			this.token = val;
			
			let header = new HttpHeaders();
			header = header.set('Content-Type', 'application/json; charset=utf-8');
			header = header.set('Accept', 'application/json');
			header = header.set('Authorization', 'Bearer ' + this.token);
			
			
			const httpOptions = {headers: header};
			var parameter = JSON.stringify({account:this.replayLoanData.account, amount:this.replayLoanData.amount, loan:this.replayLoanData.loan, 
				narration:this.replayLoanData.narration, pin:this.replayLoanData.pin });
			console.log(parameter);
				
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/loans/repay-loan";
			
			this.loading = this.loadingCtrl.create({
				content: 'Loading View. Please wait...'
			});
			this.loading.present();
			
			this.http.post<LoanApplicationRespInt>(url, parameter, httpOptions).subscribe(
				res1 => {
					this.loading.dismiss();
					console.log(res1);
					if(res1.status==1)
					{
						let alert1 = this.alertCtrl.create({
							title: 'Repay Loan',
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
							title: 'Repay Loan',
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
		this.storage.get('zambia_bank_customer_token').then((val) => {
			this.token = val;
			let selectedValue = this.replayLoanData.loan;
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/get-loan-details-by-id/" + selectedValue + "/" + this.token;
			this.http.get<LoanApplicationRespInt>(url).subscribe(
				res => {
					let status: any = null;
					status = res.status;
					console.log(res);
					console.log(status);
					if(res.status==1)
					{
						this.loan_amount = res.list.loan_amount;
						this.amount_repaid = res.list.amount_repaid;
						this.current_balance = res.list.current_balance;
					}
				},
				err => {
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
