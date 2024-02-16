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

import { LoginPage } from '../login/login';
import { RegisterStepTwoPage } from '../register-step-two/register-step-two';
//import { LoadingProvider } from '../../providers/loading/loading';

declare var cordova: any;

interface RegisterResp{
	status: string;
	response_msg: string;
	mobile_number: string;
	reg_code: string;
	province_list: any;
	district_list: any;
	agent_list: any;
}


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})


export class RegisterPage {
  lastImage: string = null;
  cropImagePath:any;

	regData = { mobile_number: '', province: '', location: '', agent: '', full_name: '' };
	authForm : FormGroup;
	province: AbstractControl;
	location: AbstractControl;
	agent: AbstractControl;
	mobile_number: AbstractControl;
	full_name: AbstractControl;
	loading: any;
	province_list: any;
	district_list: any;
	agentlist: any;
	
	
	//, public camera: Camera, public file: File, public filePath: FilePath,public loadingProvider: LoadingProvider
	constructor(public platform: Platform, public storage: Storage, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: HttpClient, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams){
		this.authForm = this.fb.group({
			'mobile_number' : [null, Validators.compose([Validators.required])],
			'province' : [null, Validators.compose([Validators.required])],
			'location' : [null, Validators.compose([Validators.required])],
			'agent' : [null, Validators.compose([Validators.required])],
			'full_name' : [null, Validators.compose([Validators.required])],
		});
		
        this.mobile_number = this.authForm.controls['mobile_number'];
		this.province = this.authForm.controls['province'];
		this.location = this.authForm.controls['location'];
		this.agent = this.authForm.controls['agent'];
		this.full_name = this.authForm.controls['full_name'];
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad RegisterPage');
		this.loading = this.loadingCtrl.create({
			content: 'Loading Provinces. Please wait...'
		});
		this.loading.present();
		this.http.get<RegisterResp>("http://smartagency.syncstatenigeria.com/api/v1/pull-provinces").subscribe(
			res => {
				this.loading.dismiss();
				let status: any = null;
				status = res.status;
				if(status==1)
				{
					this.province_list = res.province_list;
				}
			},
			err => {
				this.loading.dismiss();
				console.log('Error occured');
			}
		);
	}
	
	onProvinceChange(selectedValue : any){
		let url = "http://smartagency.syncstatenigeria.com/api/v1/pull-districts/" + this.regData.province;
		this.loading = this.loadingCtrl.create({
			content: 'Loading Districts. Please wait...'
		});
		this.loading.present();
		this.http.get<RegisterResp>(url).subscribe(
			res => {
				this.loading.dismiss();
				let status: any = null;
				status = res.status;
				if(status==1)
				{
					this.district_list = res.district_list;
				}
			},
			err => {
				this.loading.dismiss();
				console.log('Error occured');
			}
		);
	}
	
	onDistrictChange(selectedValue : any){
		let url = "http://smartagency.syncstatenigeria.com/api/v1/pull-agency-by-district/" + this.regData.location;
		this.loading = this.loadingCtrl.create({
			content: 'Loading Agents. Please wait...'
		});
		this.loading.present();
		this.http.get<RegisterResp>(url).subscribe(
			res => {
				this.loading.dismiss();
				let status: any = null;
				status = res.status;
				if(status==1)
				{
					this.agentlist = res.agent_list;
				}
			},
			err => {
				this.loading.dismiss();
				console.log('Error occured');
			}
		);
	}

	doRegisterStepOne(regData){
		/*if(regData.pass == regData.cnfpass){
		  this.loadingProvider.startLoading();
			this.afAuth.auth.createUserWithEmailAndPassword(regData.mail,regData.pass)
			.then(result => {
			  this.loadingProvider.stopLoading();
			  this.presentToast('Ragister Successfully..!')
				this.navCtrl.setRoot(LoginPage);
			}).catch(err => {
			  this.loadingProvider.stopLoading();
				console.log('err',err);
				this.presentToast(err);
		  });
		}else {
			this.presentToast('Both password are not matched!')
		}*/
		//this.navCtrl.setRoot(RegisterStepTwoPage);
		console.log(regData);
		/*var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json' );
		let options = new RequestOptions({ headers: headers });*/
		
		
		this.storage.get('bank_setup').then((val) => {
			let bank_code = val;
			var parameter = "";
			if(bank_code!=null && bank_code!=undefined && bank_code.length>0)
				parameter = JSON.stringify({province:regData.province, location:regData.location, agent:regData.agent, mobile_number:regData.mobile_number, full_name:regData.full_name, bank: bank_code});
			else
				parameter = JSON.stringify({province:regData.province, location:regData.location, agent:regData.agent, mobile_number:regData.mobile_number, full_name:regData.full_name});
				
			console.log(parameter);
			let header = new HttpHeaders();
			header = header.set('Content-Type', 'application/json; charset=utf-8');
			header = header.set('Accept', 'application/json');
			
			const httpOptions = {headers: header};
			
			this.loading = this.loadingCtrl.create({
				content: 'Loading View. Please wait...'
			});
			this.loading.present();
			
			this.http.post<RegisterResp>("http://smartagency.syncstatenigeria.com/api/v1/auth/register-step-one", parameter, httpOptions).subscribe(
				res => {
					this.loading.dismiss();
					let status: any = null;
					status = res.status;
					if(status==1)
					{
						this.navCtrl.setRoot(LoginPage);
					}
					else
					{
						let alert = this.alertCtrl.create({
							title: 'Account Verification',
							subTitle: res.response_msg,
							buttons: ['Dismiss']
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
	

	public presentActionSheet() {
		let actionSheet = this.actionSheetCtrl.create({
		  title: 'Select Image Source',
		  buttons: [
			{
			  text: 'Load from Library',
			  handler: () => {
				//this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
			  }
			},
			{
			  text: 'Use Camera',
			  handler: () => {
				//this.takePicture(this.camera.PictureSourceType.CAMERA);
			  }
			},
			{
			  text: 'Cancel',
			  role: 'cancel'
			}
		  ]
		});
		actionSheet.present();
	}

	public takePicture(sourceType) {
		// Create options for the Camera Dialog
		var options = {
		quality: 100,
		sourceType: sourceType,
		allowEdit: true,
		saveToPhotoAlbum: true,
		correctOrientation: true
		};

		// Get the data of an image
		/*this.camera.getPicture(options).then((imagePath) => {
		alert('imagePath '+imagePath);
		this.cropImagePath = imagePath;
		// Special handling for Android library
		if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
		  this.filePath.resolveNativePath(imagePath)
			.then(filePath => {
			  let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
			  let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
			  this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
			});
		} else {
		  var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
		  var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
		  this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
		}
		}, (err) => {
		this.presentToast('Error while selecting image.');
		});*/
	}

	private createFileName() {
		var d = new Date(),
		n = d.getTime(),
		newFileName =  n + ".jpg";
		return newFileName;
	}

	// Copy the image to a local folder
	private copyFileToLocalDir(namePath, currentName, newFileName) {
		alert('pathName->>'+namePath+'->currentName-->'+currentName+'->newFileName-->'+newFileName);
			/*this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
				this.lastImage = newFileName;
			}, error => {
				this.presentToast('Error while storing file.');
		});*/
	}

	moveToLogin(){
		this.navCtrl.setRoot(LoginPage);
	}

	private presentToast(text) {
		let toast = this.toastCtrl.create({
			message: text,
			duration: 3000,
			position: 'top'
		});
		toast.present();
	}

	public pathForImage(img) {
		if (img === null) {
			return '';
		} else {
			return cordova.file.dataDirectory + img;
		}
	}
	
	managePassword() {
    
	}
 
	managecnfPassword() {
    
	}
	

}
