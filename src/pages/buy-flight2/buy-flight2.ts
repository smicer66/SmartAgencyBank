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

import { BuyFlight3Page } from '../buy-flight3/buy-flight3';
import { LoginPage } from '../login/login';
//import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the BuyFlight2Page page.
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
  selector: 'page-buy-flight2',
  templateUrl: 'buy-flight2.html',
})
export class BuyFlight2Page {

	bookFlightData = { account: '', airline: '', trip_date: '', return_date: '', adults: '', child: '', destination: '', source: '', flight_from: '' };
	availableflightlist: any;
	step2title: any;
	loading: any;
	
	token: any;
	//, public file: File, public filePath: FilePath, ,public loadingProvider: LoadingProvider, public camera: Camera
	constructor(public platform: Platform, public loadingCtrl: LoadingController, public storage: Storage, public alertCtrl: AlertController, public http: HttpClient, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
		this.bookFlightData.account = navParams.get('account');
		this.bookFlightData.airline = navParams.get('airline');
		this.bookFlightData.trip_date = navParams.get('trip_date');
		this.bookFlightData.return_date = navParams.get('return_date');
		this.bookFlightData.adults = navParams.get('adults');
		this.bookFlightData.child = navParams.get('child');
		this.bookFlightData.destination = navParams.get('destination');
		this.bookFlightData.source = navParams.get('source');
		this.availableflightlist = navParams.get('availableflightlist');
		
		if(this.bookFlightData.return_date!=null)
		{
			this.step2title = 'Step 2/3 - Select Flight';
		}
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BuyFlight2Page');
	}
	
	goToSelectFlight(availableflight)
	{
		console.log(availableflight);
		if(this.bookFlightData.return_date!=null)
		{
			this.storage.get('zambia_bank_customer_token').then((val) => {
				this.token = val;
				
				let header = new HttpHeaders();
				header = header.set('Content-Type', 'application/json; charset=utf-8');
				header = header.set('Accept', 'application/json');
				
				const httpOptions = {headers: header};
				var parameter = JSON.stringify({airline:this.bookFlightData.airline, source:this.bookFlightData.source, destination:this.bookFlightData.destination, 
					trip_date:this.bookFlightData.trip_date, return_date:this.bookFlightData.return_date, preferred_flight:availableflight.id, 
					preferred_flight_code:availableflight.flight_code});
				console.log(parameter);
				this.loading = this.loadingCtrl.create({
					content: 'Please wait...'
				});
				this.loading.present();
				let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/get-return-flights";
				this.http.post<AirlineListRespInt>(url, parameter, httpOptions).subscribe(
					res => {
						let status: any = null;
						status = res.status;
						console.log(res);
						console.log(status);
						if(res.status==1)
						{
							this.loading.dismiss();
							this.availableflightlist = res.list;
							this.navCtrl.push(BuyFlight3Page, {airline:this.bookFlightData.airline, source:this.bookFlightData.source, destination:this.bookFlightData.destination, 
								trip_date:this.bookFlightData.trip_date, return_date:this.bookFlightData.return_date, availableflightlist:this.availableflightlist, 
								adults:this.bookFlightData.adults, child:this.bookFlightData.child, preferred_flight:availableflight, account:this.bookFlightData.account});
						}
						else
						{
							this.loading.dismiss();
							let alert = this.alertCtrl.create({
								title: 'Login Response',
								message: "Logging In Failed. Ensure you provide your valid passenger login details",
								buttons: ['OK']
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
