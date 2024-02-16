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

import { BuyRailwayTicket3Page } from '../buy-railway-ticket3/buy-railway-ticket3';
import { LoginPage } from '../login/login';
//import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the BuyRailwayTicket2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
interface TrainListRespInt{
	status: any;
	list: any;
	sourcelist: any;
	response_msg: any;
}


@IonicPage()
@Component({
  selector: 'page-buy-railway-ticket2',
  templateUrl: 'buy-railway-ticket2.html',
})
export class BuyRailwayTicket2Page {

	bookTrainData = { account: '', airline: '', trip_date: '', return_date: '', adults: '', child: '', destination: '', source: '', train_from: '' };
	availabletrainlist: any;
	step2title: any;
	token: any;
	loading: any;
	
	//, public camera: Camera, public filePath: FilePath,public loadingProvider: LoadingProvider, public file: File
	constructor(public platform: Platform, public storage: Storage, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: HttpClient, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
		this.bookTrainData.account = navParams.get('account');
		this.bookTrainData.airline = navParams.get('airline');
		this.bookTrainData.trip_date = navParams.get('trip_date');
		this.bookTrainData.return_date = navParams.get('return_date');
		this.bookTrainData.adults = navParams.get('adults');
		this.bookTrainData.child = navParams.get('child');
		this.bookTrainData.destination = navParams.get('destination');
		this.bookTrainData.source = navParams.get('source');
		this.availabletrainlist = navParams.get('availabletrainlist');
		
		if(this.bookTrainData.return_date!=null)
		{
			this.step2title = 'Step 2/3 - Select Train';
		}
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BuyRailwayTicket2Page');
	}
	
	goToSelectTrain(availabletrain)
	{
		console.log(availabletrain);
		if(this.bookTrainData.return_date!=null)
		{
			this.storage.get('zambia_bank_customer_token').then((val) => {
				this.token = val;
				
				let header = new HttpHeaders();
				header = header.set('Content-Type', 'application/json; charset=utf-8');
				header = header.set('Accept', 'application/json');
				
				const httpOptions = {headers: header};
				var parameter = JSON.stringify({airline:this.bookTrainData.airline, source:this.bookTrainData.source, destination:this.bookTrainData.destination, 
					trip_date:this.bookTrainData.trip_date, return_date:this.bookTrainData.return_date, preferred_train:availabletrain.id, 
					preferred_train_code:availabletrain.train_code});
				console.log(parameter);
				let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/get-return-trains";
				
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
							this.navCtrl.push(BuyRailwayTicket3Page, {airline:this.bookTrainData.airline, source:this.bookTrainData.source, destination:this.bookTrainData.destination, 
								trip_date:this.bookTrainData.trip_date, return_date:this.bookTrainData.return_date, availabletrainlist:this.availabletrainlist, 
								adults:this.bookTrainData.adults, child:this.bookTrainData.child, preferred_train:availabletrain, account:this.bookTrainData.account});
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
