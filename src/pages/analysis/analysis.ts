import { Component, ViewChild } from '@angular/core';
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
import { Chart } from 'chart.js';

/**
 * Generated class for the AnalysisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
interface AnalysisRespInt{
	list : any;
	accounts_list : any;
	status: any;
}

@IonicPage()
@Component({
  selector: 'page-analysis',
  templateUrl: 'analysis.html',
})
export class AnalysisPage {
	@ViewChild('lineCanvas') lineCanvas;
	lineChart: any;
	
	transactionslist: any = [];
	accounts_list: any = [];
	token: any;
	
	constructor(public storage: Storage, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: HttpClient, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AnalysisPage');
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
				
			let url = "http://smartagency.syncstatenigeria.com/api/v1/get-transactions-list";
			this.http.post<AnalysisRespInt>(url, parameter, httpOptions).subscribe(
				res1 => {
					console.log(res1);
					if(res1.status==1)
					{
						this.transactionslist = res1.list;
						this.accounts_list = res1.accounts_list;
						
						this.lineChart = new Chart(this.lineCanvas.nativeElement, {
							type: 'line',
							data: {
								labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
								datasets: [{
									label: "My Expenses",
									fill: false,
									lineTension: 0.1,
									backgroundColor: "rgba(255,255,255, 0)",
									borderColor: "rgba(255,255,255,1)",
									borderCapStyle: 'butt',
									borderDash: [],
									borderDashOffset: 0.0,
									borderJoinStyle: 'miter',
									pointBorderColor: "rgba(255,255,255,1)",
									pointBackgroundColor: "#fff",
									pointBorderWidth: 1,
									pointHoverRadius: 5,
									pointHoverBackgroundColor: "rgba(255,255,255,1)",
									pointHoverBorderColor: "rgba(255,255,255,1)",
									pointHoverBorderWidth: 2,
									pointRadius: 1,
									pointHitRadius: 10,
									data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40],
									spanGaps: false,
								}, {
									label: "My Inflows",
									fill: false,
									lineTension: 0.1,
									backgroundColor: "rgba(255,102,0,0)",
									borderColor: "rgba(255,102,0,1)",
									borderCapStyle: 'butt',
									borderDash: [],
									borderDashOffset: 0.0,
									borderJoinStyle: 'miter',
									pointBorderColor: "rgba(255,102,0,1)",
									pointBackgroundColor: "#fff",
									pointBorderWidth: 1,
									pointHoverRadius: 5,
									pointHoverBackgroundColor: "rgba(255,102,0,1)",
									pointHoverBorderColor: "rgba(255,102,0,1)",
									pointHoverBorderWidth: 2,
									pointRadius: 1,
									pointHitRadius: 10,
									data: [20, 29, 20, 21, 43, 32, 98, 83, 47, 33, 34, 40],
									spanGaps: false,
								}]
							}
						});
					}
					else
					{
						this.transactionslist = [];
						this.accounts_list = [];
						
						this.lineChart = new Chart(this.lineCanvas.nativeElement, {
							type: 'line',
							data: {
								labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
								datasets: [{
									label: "My Expenses",
									fill: false,
									lineTension: 0.1,
									backgroundColor: "rgba(255,255,255, 0)",
									borderColor: "rgba(255,255,255,1)",
									borderCapStyle: 'butt',
									borderDash: [],
									borderDashOffset: 0.0,
									borderJoinStyle: 'miter',
									pointBorderColor: "rgba(255,255,255,1)",
									pointBackgroundColor: "#fff",
									pointBorderWidth: 1,
									pointHoverRadius: 5,
									pointHoverBackgroundColor: "rgba(255,255,255,1)",
									pointHoverBorderColor: "rgba(255,255,255,1)",
									pointHoverBorderWidth: 2,
									pointRadius: 1,
									pointHitRadius: 10,
									data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
									spanGaps: false,
								}, {
									label: "My Inflows",
									fill: false,
									lineTension: 0.1,
									backgroundColor: "rgba(255,102,0,0)",
									borderColor: "rgba(255,102,0,1)",
									borderCapStyle: 'butt',
									borderDash: [],
									borderDashOffset: 0.0,
									borderJoinStyle: 'miter',
									pointBorderColor: "rgba(255,102,0,1)",
									pointBackgroundColor: "#fff",
									pointBorderWidth: 1,
									pointHoverRadius: 5,
									pointHoverBackgroundColor: "rgba(255,102,0,1)",
									pointHoverBorderColor: "rgba(255,102,0,1)",
									pointHoverBorderWidth: 2,
									pointRadius: 1,
									pointHitRadius: 10,
									data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
									spanGaps: false,
								}]
							}
						});
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
		this.token = null;
		this.navCtrl.setRoot(LoginPage);
		
	}

}
