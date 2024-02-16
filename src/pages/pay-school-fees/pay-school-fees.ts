import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, ActionSheetController, Platform, LoadingController } from 'ionic-angular';
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

interface SchoolFeesListRespInt{
	status: any;
	list: any;
	temp_token: any;
	fee_crit_list: any;
	total_fees: any;
	response_msg: any;
	token: any;
}

/**
 * Generated class for the PaySchoolFeesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay-school-fees',
  templateUrl: 'pay-school-fees.html',
})
export class PaySchoolFeesPage {

	paySchoolFeeData = { school: '', student_id_number: '', pin: '', narration: '', account: '' };
	paySchoolFeeForm : FormGroup;
	school: AbstractControl;
	student_id_number: AbstractControl;
	narration: AbstractControl;
	account: AbstractControl;
	
	school_fees_list: any;
	token: any;
	temp_token: any;
	accountlist: any;
	loading: any;
	
	//,public loadingProvider: LoadingProvider, public camera: Camera, public file: File, public filePath: FilePath
	constructor(public platform: Platform, public storage: Storage, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: HttpClient, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
		this.paySchoolFeeForm = this.fb.group({
			'school' : [null, Validators.compose([Validators.required])],
			'student_id_number': [null, Validators.compose([Validators.required])],
			'narration': [null, Validators.compose([])],
			'account': [null, Validators.compose([Validators.required])]
		});

        this.school = this.paySchoolFeeForm.controls['school'];
        this.student_id_number = this.paySchoolFeeForm.controls['student_id_number'];
        this.narration = this.paySchoolFeeForm.controls['narration'];
        this.account = this.paySchoolFeeForm.controls['account'];
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MobileTopUpPage');
		
		this.storage.get('zambia_bank_customer_accounts').then((val) => {
			this.accountlist = JSON.parse(val);
			let header = new HttpHeaders();
			header = header.set('Content-Type', 'application/json; charset=utf-8');
			header = header.set('Accept', 'application/json');
			
			const httpOptions = {headers: header};
			var parameter = JSON.stringify({});
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/get-school-fees-list";
			this.loading = this.loadingCtrl.create({
				content: 'Loading View. Please wait...'
			});
			this.loading.present();
			this.http.get<SchoolFeesListRespInt>(url).subscribe(
				res => {
					this.loading.dismiss();
					let status: any = null;
					status = res.status;
					console.log(res);
					console.log(status);
					if(res.status==1)
					{
						this.school_fees_list = res.list;
						this.temp_token = res.token;
					}
				},
				err => {
					this.loading.dismiss();
					console.log('Error occured');
				}
			);
		});
	}
	
	
	doPaySchoolFeeStepOne(paySchoolFeeData)
	{
		this.storage.get('zambia_bank_customer_token').then((val) => {
			this.token = val;
			let header = new HttpHeaders();
			header = header.set('Content-Type', 'application/json; charset=utf-8');
			header = header.set('Accept', 'application/json');
			
			const httpOptions = {headers: header};
			var parameter = JSON.stringify({school:paySchoolFeeData.school, student_id_number:paySchoolFeeData.student_id_number, token: this.temp_token});
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/get-student-school-fee";
			console.log(url);
			this.loading = this.loadingCtrl.create({
				content: 'Getting School Fees Details. Please wait...'
			});
			this.loading.present();
			this.http.post<SchoolFeesListRespInt>(url, parameter, httpOptions).subscribe(
				res => {
					this.loading.dismiss();
					let status: any = null;
					status = res.status;
					console.log(res);
					console.log(status);
					if(res.status==1)
					{
						let fee_crit_list = res.fee_crit_list;
						let class_ = res.list.class;
						let alert = this.alertCtrl.create({
							title: 'Pay School Fees - 2/2',
							message: ('Outstanding Fees: K' + res.total_fees),
							inputs: [
								{
									name: 'amount',
									placeholder: 'Enter Amount to pay',
									type: 'number'
								},
								{
									name: 'pin',
									placeholder: 'Enter Your 4-digit Pin',
									type: 'password'
								}
							],
							buttons: [{
									text: 'Confirm Payment',
									role: 'ok',
									handler: data => {
										console.log('confirm payment');
										let header = new HttpHeaders();
										header = header.set('Content-Type', 'application/json; charset=utf-8');
										header = header.set('Accept', 'application/json');
										header = header.set('Authorization', 'Bearer ' + this.token);
										
										
										const httpOptions = {headers: header};
										var parameter = JSON.stringify({school:paySchoolFeeData.school, student_id_number:paySchoolFeeData.student_id_number, 
											pin:data.pin, tempToken:paySchoolFeeData.tempToken, amount:data.amount, fee_crit_list: fee_crit_list, 
											narration: paySchoolFeeData.narration, class_: class_, account: paySchoolFeeData.account });
										console.log(parameter);
											
										let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/billing/paySchoolFeeConfirm";
										this.loading = this.loadingCtrl.create({
											content: 'Please wait...'
										});
										this.loading.present();
										this.http.post<SchoolFeesListRespInt>(url, parameter, httpOptions).subscribe(
											res1 => {
												console.log(res1);
												if(res1.status==1)
												{
													let alert1 = this.alertCtrl.create({
														title: 'Pay School Fees',
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
														title: 'Pay School Fees',
														subTitle: res1.response_msg,
														buttons: ['Dismiss']
													});
													alert1.present();
												}
											},
											err => {
												this.loading.dismiss();
											  console.log('Error occured');
											}
										);
										this.navCtrl.setRoot(BillPaymentPage);
									}
								}
							]
						});
						alert.present();
					}
					else
					{
						console.log(-1);
						let alert = this.alertCtrl.create({
							title: 'Pay Merchant',
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

