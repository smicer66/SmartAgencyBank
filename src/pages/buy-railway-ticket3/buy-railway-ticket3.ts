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

import { BillPaymentPage } from '../bill-payment/bill-payment';
import { LoginPage } from '../login/login';
//import { LoadingProvider } from '../../providers/loading/loading';


interface TrainListRespInt{
	status: any;
	list: any;
	sourcelist: any;
	response_msg: any;
}

/**
 * Generated class for the BuyRailwayTicket3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy-railway-ticket3',
  templateUrl: 'buy-railway-ticket3.html',
})
export class BuyRailwayTicket3Page {
	bookTrainData = { account: '', train: '', trip_date: '', return_date: '', adults: '', child: '', destination: '', source: '', train_from: '' };
	availabletrainlist: any;
	preferred_train: any;
	step2title: any;
	
	token: any;
	loading: any;
	
	//, public camera: Camera, public file: File, public filePath: FilePath,public loadingProvider: LoadingProvider
	constructor(public platform: Platform, public storage: Storage, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: HttpClient, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
		this.bookTrainData.account = navParams.get('account');
		this.bookTrainData.train = navParams.get('train');
		this.bookTrainData.trip_date = navParams.get('trip_date');
		this.bookTrainData.return_date = navParams.get('return_date');
		this.bookTrainData.adults = navParams.get('adults');
		this.bookTrainData.child = navParams.get('child');
		this.bookTrainData.destination = navParams.get('destination');
		this.bookTrainData.source = navParams.get('source');
		this.availabletrainlist = navParams.get('availabletrainlist');
		this.preferred_train = navParams.get('preferred_train');
		
		if(this.bookTrainData.return_date!=null)
		{
			this.step2title = 'Step 3/3 - Select Return Train';
		}
		console.log(this.preferred_train);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BuyTrain3Page');
	}
	
	
	goToSelectTrain(availabletrain)
	{
		console.log(availabletrain);
		if(this.bookTrainData.return_date!=null)
		{
			this.storage.get('zambia_bank_customer_token').then((val) => {
				this.token = val;
				let alertStr = 'Train: From ' + this.bookTrainData.source + ' to ' + this.bookTrainData.destination + '\n';
				alertStr = alertStr + 'Passengers: ' + this.bookTrainData.adults + this.bookTrainData.child + '\n';
				alertStr = alertStr + 'Train Date: ' + this.bookTrainData.trip_date + '\n';
				alertStr = alertStr + 'Fare Fee: K' + this.preferred_train.amount + '\n';
				
				alertStr = alertStr + 'Return Train: From ' + this.bookTrainData.destination + ' to ' + this.bookTrainData.source + '\n';
				alertStr = alertStr + 'Passengers: ' + this.bookTrainData.adults + this.bookTrainData.child + '\n';
				alertStr = alertStr + 'Train Date: ' + availabletrain.return_date + '\n';
				alertStr = alertStr + 'Fare Fee: K' + availabletrain.amount + '\n';
				
				alertStr = alertStr + '--------------------\n';
				alertStr = alertStr + 'Total Fare: K' + (parseFloat(this.preferred_train.amount) + parseFloat(availabletrain.amount)) + '\n';
				
				let alert = this.alertCtrl.create({
					title: 'Confirm Train',
					message: (alertStr),
					inputs: [
						{
							name: 'first_name',
							placeholder: 'Lead Passengers First Name',
							type: 'text'
						},
						{
							name: 'last_name',
							placeholder: 'Lead Passengers Last Name',
							type: 'text'
						},
						{
							name: 'other_name',
							placeholder: 'Lead Passengers Other Name',
							type: 'text'
						},
						{
							name: 'national_id_number',
							placeholder: 'Lead Passengers National Id',
							type: 'text'
						},
						{
							name: 'mobile_number',
							placeholder: 'Passengers Mobile Number',
							type: 'text'
						},
						{
							name: 'email_address',
							placeholder: 'Passengers Email Address',
							type: 'text'
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
								var parameter = JSON.stringify({train:this.bookTrainData.train, source:this.bookTrainData.source, destination:this.bookTrainData.destination, 
									trip_date:this.bookTrainData.trip_date, return_date:this.bookTrainData.return_date, preferred_train:availabletrain.id, 
									preferred_train_code:availabletrain.train_code, preferred_return_train:availabletrain.id, preferred_return_train_code:availabletrain.train_code, 
									first_name:data.first_name, last_name:data.last_name, other_name:data.other_name, national_id_number:data.national_id_number, mobile_number:data.mobile_number, 
									email_address:data.email_address, pin:data.pin, account:this.bookTrainData.account, adults:this.bookTrainData.adults, child:this.bookTrainData.child });
								console.log(parameter);
									
								let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/billing/pay-for-train";
								
								this.loading = this.loadingCtrl.create({
									content: 'Please wait...'
								});
								this.loading.present();
								this.http.post<TrainListRespInt>(url, parameter, httpOptions).subscribe(
									res1 => {
										console.log(res1);
										this.loading.dismiss();
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
								//this.navCtrl.setRoot(BillPaymentPage);
							}
						}
					]
				});
				alert.present();
			});
		}
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

