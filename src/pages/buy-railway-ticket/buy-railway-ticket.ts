import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, Platform, AlertController, LoadingController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/take';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/*import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';*/

import { AngularFireAuth } from 'angularfire2/auth';

import { BuyRailwayTicket2Page } from '../buy-railway-ticket2/buy-railway-ticket2';
import { LoginPage } from '../login/login';
//import { LoadingProvider } from '../../providers/loading/loading';


interface TrainListRespInt{
	status: any;
	list: any;
	sourcelist: any;
	response_msg: any;
}

/**
 * Generated class for the BuyRailwayTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy-railway-ticket',
  templateUrl: 'buy-railway-ticket.html',
})
export class BuyRailwayTicketPage {

	buyRailwayTicketData = { train: '', account: '', trip_date: '', return_date: '', adults: '', child: '', destination: '', source: ''  };
		/*first_name: '', last_name: '', other_name: '', 
		national_id_number: '', mobile_number: '', email_address: '', pin: '', narration: ''*/
	buyRailwayTicketForm : FormGroup;
	train: AbstractControl;
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
	
	trainlist: any;
	sourcelist: any;
	destinationlist: any;
	availabletrainlist: any;
	accountlist: any;
	
	loading: any;
	
	token: any;
	//, public filePath: FilePath, public camera: Camera, public file: File,public loadingProvider: LoadingProvider
	constructor(public platform: Platform, public storage: Storage, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: HttpClient, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
		this.buyRailwayTicketForm = this.fb.group({
			'train' : [null, Validators.compose([Validators.required])],
			'trip_date': [null, Validators.compose([Validators.required])],
			'return_date': [null, Validators.compose([Validators.required])],
			'adults': [null, Validators.compose([])],
			'child': [null, Validators.compose([Validators.required])],
			'account': [null, Validators.compose([Validators.required])],
			'destination': [null, Validators.compose([Validators.required])],
			'source': [null, Validators.compose([Validators.required])]
			/*'first_name': [null, Validators.compose([Validators.required])],
			'last_name': [null, Validators.compose([Validators.required])],
			'other_name': [null, Validators.compose([])],
			'national_id_number': [null, Validators.compose([Validators.required])],
			'mobile_number': [null, Validators.compose([Validators.required])],
			'email_address': [null, Validators.compose([Validators.required])],
			'narration': [null, Validators.compose([])],
			'pin': [null, Validators.compose([Validators.required])]*/
		});

        this.train = this.buyRailwayTicketForm.controls['train'];
        this.trip_date = this.buyRailwayTicketForm.controls['trip_date'];
        this.return_date = this.buyRailwayTicketForm.controls['return_date'];
        this.adults = this.buyRailwayTicketForm.controls['adults'];
        this.child = this.buyRailwayTicketForm.controls['child'];
        this.account = this.buyRailwayTicketForm.controls['account'];
        this.destination = this.buyRailwayTicketForm.controls['destination'];
        this.source = this.buyRailwayTicketForm.controls['source'];
		/*this.first_name = this.buyRailwayTicketForm.controls['first_name'];
        this.last_name = this.buyRailwayTicketForm.controls['last_name'];
        this.other_name = this.buyRailwayTicketForm.controls['other_name'];
        this.national_id_number = this.buyRailwayTicketForm.controls['national_id_number'];
        this.mobile_number = this.buyRailwayTicketForm.controls['mobile_number'];
		this.email_address = this.buyRailwayTicketForm.controls['email_address'];
        this.narration = this.buyRailwayTicketForm.controls['narration'];
        this.pin = this.buyRailwayTicketForm.controls['pin'];*/
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad buyRailwayTicketPage');
		this.storage.get('zambia_bank_customer_accounts').then((val) => {
			console.log(val);
			this.accountlist = JSON.parse(val);
			let header = new HttpHeaders();
			header = header.set('Content-Type', 'application/json; charset=utf-8');
			header = header.set('Accept', 'application/json');
			
			const httpOptions = {headers: header};
			var parameter = JSON.stringify({});
			this.loading = this.loadingCtrl.create({
				content: 'Loading View. Please wait...'
			});
			this.loading.present();
			
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/get-train-providers";
			this.http.get<TrainListRespInt>(url).subscribe(
				res => {
					this.loading.dismiss();
					let status: any = null;
					status = res.status;
					console.log(res);
					console.log(status);
					if(res.status==1)
					{
						this.trainlist = res.list;
						this.sourcelist = res.sourcelist;
					}
				},
				err => {
					this.loading.dismiss();
				  console.log('Error occured');
				}
			);
		});
	}

	
	onSourceChange(selectedValue: any) {
		console.log('Selected', selectedValue);
		let header = new HttpHeaders();
		header = header.set('Content-Type', 'application/json; charset=utf-8');
		header = header.set('Accept', 'application/json');
		
		const httpOptions = {headers: header};
		var parameter = JSON.stringify({});
		let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/get-train-destination/" + selectedValue;
		this.http.get<TrainListRespInt>(url).subscribe(
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
	
	searchTrainTrips(buyRailwayTicketData)
	{
		this.storage.get('zambia_bank_customer_token').then((val) => {
			this.token = val;
			
			let header = new HttpHeaders();
			header = header.set('Content-Type', 'application/json; charset=utf-8');
			header = header.set('Accept', 'application/json');
			
			const httpOptions = {headers: header};
			var parameter = JSON.stringify({train:buyRailwayTicketData.train, source:buyRailwayTicketData.source, destination:buyRailwayTicketData.destination, 
							trip_date:buyRailwayTicketData.trip_date, return_date:buyRailwayTicketData.return_date});
			console.log(parameter);
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/get-available-train-trips";
			
			this.loading = this.loadingCtrl.create({
				content: 'Please wait...'
			});
			this.loading.present();
			
			this.http.post<TrainListRespInt>(url, parameter, httpOptions).subscribe(
				res => {
					let status: any = null;
					status = res.status;
					console.log(res);
					console.log(status);
					this.loading.dismiss();
					if(res.status==1)
					{
						this.availabletrainlist = res.list;
						this.navCtrl.push(BuyRailwayTicket2Page, {train:buyRailwayTicketData.train, source:buyRailwayTicketData.source, destination:buyRailwayTicketData.destination, 
							trip_date:buyRailwayTicketData.trip_date, return_date:buyRailwayTicketData.return_date, availabletrainlist:this.availabletrainlist, 
							adults:buyRailwayTicketData.adults, child:buyRailwayTicketData.child, account:buyRailwayTicketData.account});
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

