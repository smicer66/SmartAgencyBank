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

import { BuyFlight2Page } from '../buy-flight2/buy-flight2';
import { BillPaymentPage } from '../bill-payment/bill-payment';
import { LoginPage } from '../login/login';
//import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the BuyFlight3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface AirlineListRespInt{
	status: any;
	list: any;
	response_msg: any;
	sourcelist: any;
}

@IonicPage()
@Component({
  selector: 'page-buy-flight3',
  templateUrl: 'buy-flight3.html',
})
export class BuyFlight3Page {

	bookFlightData = { account: '', airline: '', trip_date: '', return_date: '', adults: '', child: '', destination: '', source: '', flight_from: '' };
	availableflightlist: any;
	preferred_flight: any;
	step2title: any;
	token: any;
	loading: any;
	
	//, public camera: Camera, public file: File, public filePath: FilePath, public loadingProvider: LoadingProvider
	constructor(public platform: Platform, public storage: Storage, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: HttpClient, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
		this.bookFlightData.account = navParams.get('account');
		this.bookFlightData.airline = navParams.get('airline');
		this.bookFlightData.trip_date = navParams.get('trip_date');
		this.bookFlightData.return_date = navParams.get('return_date');
		this.bookFlightData.adults = navParams.get('adults');
		this.bookFlightData.child = navParams.get('child');
		this.bookFlightData.destination = navParams.get('destination');
		this.bookFlightData.source = navParams.get('source');
		this.availableflightlist = navParams.get('availableflightlist');
		this.preferred_flight = navParams.get('preferred_flight');
		
		if(this.bookFlightData.return_date!=null)
		{
			this.step2title = 'Step 3/3 - Select Return Flight';
		}
		console.log(this.preferred_flight);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BuyFlight3Page');
	}
	
	
	goToSelectFlight(availableflight)
	{
		console.log(availableflight);
		if(this.bookFlightData.return_date!=null)
		{
			this.storage.get('zambia_bank_customer_token').then((val) => {
				this.token = val;
				let alertStr = 'Flight: From ' + this.bookFlightData.source + ' to ' + this.bookFlightData.destination + '\n';
				alertStr = alertStr + 'Passengers: ' + this.bookFlightData.adults + this.bookFlightData.child + '\n';
				alertStr = alertStr + 'Flight Date: ' + this.bookFlightData.trip_date + '\n';
				alertStr = alertStr + 'Fare Fee: K' + this.preferred_flight.amount + '\n';
				
				alertStr = alertStr + 'Return Flight: From ' + this.bookFlightData.destination + ' to ' + this.bookFlightData.source + '\n';
				alertStr = alertStr + 'Passengers: ' + this.bookFlightData.adults + this.bookFlightData.child + '\n';
				alertStr = alertStr + 'Flight Date: ' + availableflight.return_date + '\n';
				alertStr = alertStr + 'Fare Fee: K' + availableflight.amount + '\n';
				
				alertStr = alertStr + '--------------------\n';
				alertStr = alertStr + 'Total Fare: K' + (parseFloat(this.preferred_flight.amount) + parseFloat(availableflight.amount)) + '\n';
				
				let alert = this.alertCtrl.create({
					title: 'Confirm Flight',
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
								var parameter = JSON.stringify({airline:this.bookFlightData.airline, source:this.bookFlightData.source, destination:this.bookFlightData.destination, 
									trip_date:this.bookFlightData.trip_date, return_date:this.bookFlightData.return_date, preferred_flight:availableflight.id, 
									preferred_flight_code:availableflight.flight_code, preferred_return_flight:availableflight.id, preferred_return_flight_code:availableflight.flight_code, 
									first_name:data.first_name, last_name:data.last_name, other_name:data.other_name, national_id_number:data.national_id_number, mobile_number:data.mobile_number, 
									email_address:data.email_address, pin:data.pin, account:this.bookFlightData.account, adults:this.bookFlightData.adults, child:this.bookFlightData.child });
								console.log(parameter);
									
								let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/billing/pay-for-flight";
								
								this.loading = this.loadingCtrl.create({
									content: 'Please wait...'
								});
								this.loading.present();
								this.http.post<AirlineListRespInt>(url, parameter, httpOptions).subscribe(
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
