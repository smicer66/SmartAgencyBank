import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController, NavParams, ToastController, ActionSheetController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/take';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/*import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';*/

import { AngularFireAuth } from 'angularfire2/auth';
//import { LoadingProvider } from '../../providers/loading/loading';
import { OpenNewAccountPage } from '../open-new-account/open-new-account';
import { ManageAccountsPage } from '../manage-accounts/manage-accounts';
import { LoginPage } from '../login/login';

/**
 * Generated class for the AccountsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface AccountsListRespInt{
	status: any;
	response_msg: any;
	accounts_list: any;
}


@IonicPage()
@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})
export class AccountsPage {
	@ViewChild(Nav) nav: Nav;
	
	token: any;
	accountslist: any = [];
	

	constructor(public storage: Storage, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: HttpClient, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AccountsPage');
	}
  
	openNewAccount(){
		let params = {};
		this.navCtrl.push(OpenNewAccountPage);
	}
  
	accountListing(){
		let params = {};
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
			this.loading = this.loadingCtrl.create({
				content: 'Loading View. Please wait...'
			});
			this.loading.present();
			this.http.post<AccountsListRespInt>(url, parameter, httpOptions).subscribe(
				res1 => {
					this.loading.dismiss();
					console.log(res1);
					if(res1.status==1)
					{
						this.accountslist = res1.list;
						this.navCtrl.push(ManageAccountsPage);
					}
					else
					{
						let alert1 = this.alertCtrl.create({
							title: 'Accounts Listing',
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
		loading.dismiss();
		this.navCtrl.setRoot(LoginPage);
		
	}

}
