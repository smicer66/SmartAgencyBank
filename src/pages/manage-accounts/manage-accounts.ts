import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/take';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ManageAccountsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
interface ManageAccountsRespInt{
	list : any;
	accounts_list : any;
	status: any;
}


@IonicPage()
@Component({
  selector: 'page-manage-accounts',
  templateUrl: 'manage-accounts.html',
})
export class ManageAccountsPage {
	token: any;
	accounts_list: any = [];
	
	constructor(public storage: Storage, public alertCtrl: AlertController, public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, public loadingCtrl: LoadingController) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ManageAccountsPage');
		this.storage.get('zambia_bank_customer_token').then((val) => {
			console.log(val);
			this.token = val;
			
			let header = new HttpHeaders();
			header = header.set('Content-Type', 'application/json; charset=utf-8');
			header = header.set('Accept', 'application/json');
			header = header.set('Authorization', 'Bearer ' + this.token);
			
			const httpOptions = {headers: header};
			var parameter = JSON.stringify({ });
			console.log(parameter);
				
			let url = "http://smartagency.syncstatenigeria.com/api/v1/get-accounts-list";
			this.http.post<ManageAccountsRespInt>(url, parameter, httpOptions).subscribe(
				res1 => {
					console.log(res1);
					if(res1.status==1)
					{
						this.accounts_list = res1.accounts_list;
						
						
					}
					else
					{
						this.accounts_list = [];
					}
				},
				err => {
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
		loading.dismiss();
		this.navCtrl.setRoot(LoginPage);
		
	}

}
