import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/take';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { LoginPage } from '../login/login';
import { ChequesCardsPage } from '../cheques-cards/cheques-cards';

/**
 * Generated class for the ManageCardsPage page.
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
  selector: 'page-manage-cards',
  templateUrl: 'manage-cards.html',
})
export class ManageCardsPage {

	
	cardlist: any = [];
	token: any;
	loading: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: HttpClient) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ManageCardsPage');
		this.storage.get('zambia_bank_customer_token').then((val) => {
			this.token = val;
			
			let header = new HttpHeaders();
			header = header.set('Content-Type', 'application/json; charset=utf-8');
			header = header.set('Accept', 'application/json');
			header = header.set('Authorization', 'Bearer ' + this.token);
			
			const httpOptions = {headers: header};
			var parameter = JSON.stringify({ });
			console.log(parameter);
				
			let url = "http://bankmobileapp.syncstatenigeria.com/api/v1/cheques-cards/get-card-list";
			
			this.loading = this.loadingCtrl.create({
				content: 'Loading View. Please wait...'
			});
			this.loading.present();
			this.http.post<ChequeCardRespInt>(url, parameter, httpOptions).subscribe(
				res1 => {
					console.log(res1);
					this.loading.dismiss();
					if(res1.status==1)
					{
						this.cardlist = res1.list;
					}
					else
					{
						let alert1 = this.alertCtrl.create({
							title: 'Request Cheque Book',
							subTitle: res1.response_msg,
							buttons: ['Dismiss']
						});
						alert1.present();
						this.navCtrl.setRoot(ChequesCardsPage);
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
	
	
	goToDeactivateCard(id)
	{
		console.log(id);
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
