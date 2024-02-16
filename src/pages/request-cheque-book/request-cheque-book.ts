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
import { ChequesCardsPage } from '../cheques-cards/cheques-cards';

/**
 * Generated class for the RequestChequeBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
 

interface ChequeCardRespInt{
	status: any;
	list: any;
	response_msg: any;
	total: any;
}



@IonicPage()
@Component({
  selector: 'page-request-cheque-book',
  templateUrl: 'request-cheque-book.html',
})
export class RequestChequeBookPage {

	requestChequeBookData = { cheque_leaves: '', collection_point: '', account: '', narration: '', pin: '' };
	requestChequeBookForm : FormGroup;
	cheque_leaves: AbstractControl;
	collection_point: AbstractControl;
	account: AbstractControl;
	narration: AbstractControl;
	pin: AbstractControl;
	
	agentlist: any = [];
	accountlist: any = [];
	token: any;
	
	loading: any;
	

	
	//, public camera: Camera, public file: File, public filePath: FilePath,public loadingProvider: LoadingProvider
	constructor(public platform: Platform, public storage: Storage, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: HttpClient, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams){
		this.requestChequeBookForm = this.fb.group({
			'cheque_leaves' : [null, Validators.compose([Validators.required])],
			'collection_point': [null, Validators.compose([Validators.required])],
			'account':  [null, Validators.compose([Validators.required])],
			'narration':  [null, Validators.compose([Validators.required])],
			'pin':  [null, Validators.compose([Validators.required])]
		});

        this.cheque_leaves = this.requestChequeBookForm.controls['cheque_leaves'];
        this.collection_point = this.requestChequeBookForm.controls['collection_point'];
		this.account = this.requestChequeBookForm.controls['account'];
        this.narration = this.requestChequeBookForm.controls['narration'];
		this.pin = this.requestChequeBookForm.controls['pin'];
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad requestChequeBookPage');
		this.storage.get('zambia_bank_customer_accounts').then((val) => {
			console.log(val);
			this.accountlist = JSON.parse(val);
			this.loading = this.loadingCtrl.create({
				content: 'Loading View. Please wait...'
			});
			this.loading.present();
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/get-agent-list";
			this.http.get<ChequeCardRespInt>(url).subscribe(
				res => {
					this.loading.dismiss();
					let status: any = null;
					status = res.status;
					console.log(res);
					console.log(status);
					if(res.status==1)
					{
						this.agentlist = res.list;
					}
				},
				err => {
					this.loading.dismiss();
				  console.log('Error occured');
				}
			);
		});
	}
  
	doRequestChequeBook(requestChequeBookData){
		//this.navCtrl.setRoot(requestChequeBookPage);
		this.storage.get('zambia_bank_customer_token').then((val) => {
			this.token = val;
			
			let header = new HttpHeaders();
			header = header.set('Content-Type', 'application/json; charset=utf-8');
			header = header.set('Accept', 'application/json');
			header = header.set('Authorization', 'Bearer ' + this.token);
			
			
			const httpOptions = {headers: header};
			var parameter = JSON.stringify({account:this.requestChequeBookData.account, leaves:this.requestChequeBookData.cheque_leaves, agent:this.requestChequeBookData.collection_point, 
				narration:this.requestChequeBookData.narration, pin:this.requestChequeBookData.pin });
			console.log(parameter);
			
			this.loading = this.loadingCtrl.create({
				content: 'Loading View. Please wait...'
			});
			this.loading.present();
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/cheques-cards/request-cheque-book";
			this.http.post<ChequeCardRespInt>(url, parameter, httpOptions).subscribe(
				res1 => {
					console.log(res1);
					this.loading.dismiss();
					if(res1.status==1)
					{
						let alert1 = this.alertCtrl.create({
							title: 'Request Cheque Book',
							subTitle: res1.response_msg,
							buttons: [{
								text: 'Ok',
								role: 'ok',
								handler: () => {
									console.log('Valid 1');
									this.navCtrl.setRoot(ChequesCardsPage);
								}
							}]
						});
						alert1.present();
					}
					else
					{
						let alert1 = this.alertCtrl.create({
							title: 'Request Cheque Book',
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
		this.token = null;
		loading.dismiss();
		this.navCtrl.setRoot(LoginPage);
		
	}

}
