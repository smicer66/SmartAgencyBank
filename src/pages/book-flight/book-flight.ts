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
import { LoginPage } from '../login/login';
//import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the BookFlightPage page.
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
  selector: 'page-book-flight',
  templateUrl: 'book-flight.html',
})
export class BookFlightPage {

	bookFlightData = { account: '', airline: '', trip_date: '', return_date: '', adults: '', child: '', destination: '', source: '' };
	/*, first_name: '', last_name: '', other_name: '', 
		national_id_number: '', mobile_number: '', email_address: '', pin: '', narration: ''*/
	bookFlightForm : FormGroup;
	airline: AbstractControl;
	trip_date: AbstractControl;
	return_date: AbstractControl;
	adults: AbstractControl;
	child: AbstractControl;
	account: AbstractControl;
	destination: AbstractControl;
	source: AbstractControl;
	/*first_name: AbstractControl;
	last_name: AbstractControl;
	other_name: AbstractControl;
	national_id_number: AbstractControl;
	mobile_number: AbstractControl;
	email_address: AbstractControl;
	narration: AbstractControl;
	pin: AbstractControl;*/
	
	airlinelist: any;
	sourcelist: any;
	destinationlist: any;
	availableflightlist: any;
	accountlist: any;
	token: any;
	loading: any;
	
	//, public file: File, public filePath: FilePath, public camera: Camera,public loadingProvider: LoadingProvider
	constructor(public platform: Platform, public loadingCtrl: LoadingController, public storage: Storage, public alertCtrl: AlertController, public http: HttpClient, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
		this.bookFlightForm = this.fb.group({
			'airline' : [null, Validators.compose([Validators.required])],
			'trip_date': [null, Validators.compose([Validators.required])],
			'return_date': [null, Validators.compose([])],
			'adults': [null, Validators.compose([])],
			'child': [null, Validators.compose([Validators.required])],
			'account': [null, Validators.compose([Validators.required])],
			'destination': [null, Validators.compose([Validators.required])],
			'source': [null, Validators.compose([Validators.required])]
		});
		/*,
			'first_name': [null, Validators.compose([Validators.required])],
			'last_name': [null, Validators.compose([Validators.required])],
			'other_name': [null, Validators.compose([])],
			'national_id_number': [null, Validators.compose([Validators.required])],
			'mobile_number': [null, Validators.compose([Validators.required])],
			'email_address': [null, Validators.compose([Validators.required])],
			'narration': [null, Validators.compose([])],
			'pin': [null, Validators.compose([Validators.required])]*/

        this.airline = this.bookFlightForm.controls['airline'];
        this.trip_date = this.bookFlightForm.controls['trip_date'];
        this.return_date = this.bookFlightForm.controls['return_date'];
        this.adults = this.bookFlightForm.controls['adults'];
        this.child = this.bookFlightForm.controls['child'];
        this.account = this.bookFlightForm.controls['account'];
        this.destination = this.bookFlightForm.controls['destination'];
        this.source = this.bookFlightForm.controls['source'];
		/*this.first_name = this.bookFlightForm.controls['first_name'];
        this.last_name = this.bookFlightForm.controls['last_name'];
        this.other_name = this.bookFlightForm.controls['other_name'];
        this.national_id_number = this.bookFlightForm.controls['national_id_number'];
        this.mobile_number = this.bookFlightForm.controls['mobile_number'];
		this.email_address = this.bookFlightForm.controls['email_address'];
        this.narration = this.bookFlightForm.controls['narration'];
        this.pin = this.bookFlightForm.controls['pin'];*/
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
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/get-airline-providers";
			
			this.loading = this.loadingCtrl.create({
				content: 'Loading View. Please wait...'
			});
			this.loading.present();
			this.http.get<AirlineListRespInt>(url).subscribe(
				res => {
					let status: any = null;
					status = res.status;
					console.log(res);
					console.log(status);
					if(res.status==1)
					{
						this.airlinelist = res.list;
						this.sourcelist = res.sourcelist;
					}
				},
				err => {
				  console.log('Error occured');
				}
			);
			this.loading.dismiss();
		});
	}
	
	onSourceChange(selectedValue: any) {
		console.log('Selected', selectedValue);
		let header = new HttpHeaders();
		header = header.set('Content-Type', 'application/json; charset=utf-8');
		header = header.set('Accept', 'application/json');
		
		const httpOptions = {headers: header};
		var parameter = JSON.stringify({});
		let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/get-flight-destination/" + selectedValue;
		this.http.get<AirlineListRespInt>(url).subscribe(
			res => {
				let status: any = null;
				status = res.status;
				console.log(res);
				console.log(status);
				if(res.status==1)
				{
					this.destinationlist = res.list;
				}
				else
				{
					let alert = this.alertCtrl.create({
						title: 'Login Response',
						message: "Logging In Failed. Ensure you provide your valid passenger login details",
						buttons: ['OK']
					});
					alert.present();
				}
			},
			err => {
			  console.log('Error occured');
			}
		);
	}
	
	searchFlights(bookFlightData)
	{
		this.storage.get('zambia_bank_customer_token').then((val) => {
			this.token = val;
			
			let header = new HttpHeaders();
			header = header.set('Content-Type', 'application/json; charset=utf-8');
			header = header.set('Accept', 'application/json');
			
			const httpOptions = {headers: header};
			var parameter = JSON.stringify({airline:bookFlightData.airline, source:bookFlightData.source, destination:bookFlightData.destination, 
							trip_date:bookFlightData.trip_date, return_date:bookFlightData.return_date});
			console.log(parameter);
			
			this.loading = this.loadingCtrl.create({
				content: 'Loading View. Please wait...'
			});
			this.loading.present();
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/get-available-flights";
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
						this.navCtrl.push(BuyFlight2Page, {airline:bookFlightData.airline, source:bookFlightData.source, destination:bookFlightData.destination, 
							trip_date:bookFlightData.trip_date, return_date:bookFlightData.return_date, availableflightlist:this.availableflightlist, 
							adults:bookFlightData.adults, child:bookFlightData.child, account:bookFlightData.account});
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
