import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, Platform, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from "@ionic/storage";

/*import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';*/

import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from '../login/login';
//import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the BookBusTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book-bus-ticket',
  templateUrl: 'book-bus-ticket.html',
})
export class BookBusTicketPage {

	bookBusTicketData = { airline: '', trip_date: '', return_date: '', adults: '', first_name: '', last_name: '', other_name: '', 
		national_id_number: '', mobile_number: '', email_address: '', pin: '', narration: '' };
	bookBusTicketForm : FormGroup;
	airline: AbstractControl;
	trip_date: AbstractControl;
	return_date: AbstractControl;
	adults: AbstractControl;
	first_name: AbstractControl;
	last_name: AbstractControl;
	other_name: AbstractControl;
	national_id_number: AbstractControl;
	mobile_number: AbstractControl;
	email_address: AbstractControl;
	narration: AbstractControl;
	pin: AbstractControl;
	
	token: any;
	
	//, public camera: Camera, public file: File, public filePath: FilePath, public loadingProvider: LoadingProvider
	constructor(public storage: Storage, public loadingCtrl: LoadingController, public platform: Platform, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public afAuth: AngularFireAuth, public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
		this.bookBusTicketForm = this.fb.group({
			'airline' : [null, Validators.compose([Validators.required])],
			'trip_date': [null, Validators.compose([Validators.required])],
			'return_date': [null, Validators.compose([Validators.required])],
			'adults': [null, Validators.compose([])],
			'first_name': [null, Validators.compose([Validators.required])],
			'last_name': [null, Validators.compose([Validators.required])],
			'other_name': [null, Validators.compose([])],
			'national_id_number': [null, Validators.compose([Validators.required])],
			'mobile_number': [null, Validators.compose([Validators.required])],
			'email_address': [null, Validators.compose([Validators.required])],
			'narration': [null, Validators.compose([])],
			'pin': [null, Validators.compose([Validators.required])]
		});

        this.airline = this.bookBusTicketForm.controls['airline'];
        this.trip_date = this.bookBusTicketForm.controls['trip_date'];
        this.return_date = this.bookBusTicketForm.controls['return_date'];
        this.adults = this.bookBusTicketForm.controls['adults'];
		this.first_name = this.bookBusTicketForm.controls['first_name'];
        this.last_name = this.bookBusTicketForm.controls['last_name'];
        this.other_name = this.bookBusTicketForm.controls['other_name'];
        this.national_id_number = this.bookBusTicketForm.controls['national_id_number'];
        this.mobile_number = this.bookBusTicketForm.controls['mobile_number'];
		this.email_address = this.bookBusTicketForm.controls['email_address'];
        this.narration = this.bookBusTicketForm.controls['narration'];
        this.pin = this.bookBusTicketForm.controls['pin'];
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad bookBusTicketPage');
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
