import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { MyApp } from './app.component';
import { IntroPage } from '../pages/intro/intro';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgetPage } from '../pages/forget/forget';
import { RegisterStepTwoPage } from '../pages/register-step-two/register-step-two';
import { RegisterStepThreePage } from '../pages/register-step-three/register-step-three';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AnalysisPage } from '../pages/analysis/analysis';
import { BillPaymentPage } from '../pages/bill-payment/bill-payment';
import { MobileTopUpPage } from '../pages/mobile-top-up/mobile-top-up';
import { CableTvPage } from '../pages/cable-tv/cable-tv';
import { PayMerchantPage } from '../pages/pay-merchant/pay-merchant';
import { PaySchoolFeesPage } from '../pages/pay-school-fees/pay-school-fees';
import { BookFlightPage } from '../pages/book-flight/book-flight';
import { BuyInternetDataPage } from '../pages/buy-internet-data/buy-internet-data';
import { PayUtilitiesPage } from '../pages/pay-utilities/pay-utilities';
import { FundsTransferPage } from '../pages/funds-transfer/funds-transfer';
import { FundsTransferWithinBankPage } from '../pages/funds-transfer-within-bank/funds-transfer-within-bank';
import { FundsTransferOtherBanksPage } from '../pages/funds-transfer-other-banks/funds-transfer-other-banks';
import { FundsTransferInternationalPage } from '../pages/funds-transfer-international/funds-transfer-international';
import { FundsTransferSubsidiaryPage } from '../pages/funds-transfer-subsidiary/funds-transfer-subsidiary';
import { AccountsPage } from '../pages/accounts/accounts';
import { LoansPage } from '../pages/loans/loans';
import { ChequesCardsPage } from '../pages/cheques-cards/cheques-cards';
import { DepositsWithdrawalsPage } from '../pages/deposits-withdrawals/deposits-withdrawals';
import { FaqsPage } from '../pages/faqs/faqs';
import { OpenNewAccountPage } from '../pages/open-new-account/open-new-account';
import { ManageAccountsPage } from '../pages/manage-accounts/manage-accounts';
import { LoanApplicationPage } from '../pages/loan-application/loan-application';
import { RepayLoanPage } from '../pages/repay-loan/repay-loan';
import { LoanRepaymentSchedulePage } from '../pages/loan-repayment-schedule/loan-repayment-schedule';
import { RequestChequeBookPage } from '../pages/request-cheque-book/request-cheque-book';
import { RequestCardPage } from '../pages/request-card/request-card';
import { ManageCardsPage } from '../pages/manage-cards/manage-cards';
import { StopChequePaymentPage } from '../pages/stop-cheque-payment/stop-cheque-payment';
import { CashDepositPage } from '../pages/cash-deposit/cash-deposit';
import { CashWithdrawalPage } from '../pages/cash-withdrawal/cash-withdrawal';
import { ChequeDepositPage } from '../pages/cheque-deposit/cheque-deposit';
import { BookBusTicketPage } from '../pages/book-bus-ticket/book-bus-ticket';
import { BuyRailwayTicketPage } from '../pages/buy-railway-ticket/buy-railway-ticket';
import { BuyFlight2Page } from '../pages/buy-flight2/buy-flight2';
import { BuyFlight3Page } from '../pages/buy-flight3/buy-flight3';
import { BuyRailwayTicket2Page } from '../pages/buy-railway-ticket2/buy-railway-ticket2';
import { BuyRailwayTicket3Page } from '../pages/buy-railway-ticket3/buy-railway-ticket3';
import { MiniStatementPage } from '../pages/mini-statement/mini-statement';
import { ExpandableComponent } from '../components/expandable/expandable';


export const firebaseConfig = {
  apiKey: "AIzaSyAXjl9L_uUGLHYNGX0BvqsUx_VExs8zaeY",
   authDomain: "fir-auth-bdcc0.firebaseapp.com",
   databaseURL: "https://fir-auth-bdcc0.firebaseio.com",
   projectId: "fir-auth-bdcc0",
   storageBucket: "fir-auth-bdcc0.appspot.com",
   messagingSenderId: "544712685938"
};

@NgModule({
  declarations: [
    MyApp,
	IntroPage,
    HomePage,
	LoginPage,
    RegisterPage,
    ForgetPage,
	RegisterStepTwoPage,
	RegisterStepThreePage,
	DashboardPage,
	AnalysisPage,
	BillPaymentPage,
	MobileTopUpPage,
	CableTvPage,
	PayMerchantPage,
	PaySchoolFeesPage,
	BookFlightPage,
	BuyInternetDataPage,
	PayUtilitiesPage,
	FundsTransferPage,
	FundsTransferWithinBankPage,
	FundsTransferOtherBanksPage,
	FundsTransferInternationalPage,
	FundsTransferSubsidiaryPage,
	AccountsPage,
	LoansPage,
	ChequesCardsPage,
	DepositsWithdrawalsPage,
	FaqsPage,
	OpenNewAccountPage,
	ManageAccountsPage,
	LoanApplicationPage,
	RepayLoanPage,
	LoanRepaymentSchedulePage,
	RequestChequeBookPage,
	RequestCardPage,
	ManageCardsPage,
	StopChequePaymentPage,
	CashDepositPage,
	CashWithdrawalPage,
	ChequeDepositPage,
	BookBusTicketPage,
	BuyRailwayTicketPage,
	BuyFlight2Page,
	BuyFlight3Page,
	BuyRailwayTicket2Page,
	BuyRailwayTicket3Page,
	MiniStatementPage,
	ExpandableComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
    IonicModule.forRoot(MyApp),
	IonicStorageModule.forRoot({
      name: '_zambiabank_v1',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
	AngularFontAwesomeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
	IntroPage,
    HomePage,
	LoginPage,
	RegisterPage,
    ForgetPage,
	RegisterStepTwoPage,
	RegisterStepThreePage,
	DashboardPage,
	AnalysisPage,
	BillPaymentPage,
	MobileTopUpPage,
	CableTvPage,
	PayMerchantPage,
	PaySchoolFeesPage,
	BookFlightPage,
	BuyInternetDataPage,
	PayUtilitiesPage,
	FundsTransferPage,
	FundsTransferWithinBankPage,
	FundsTransferOtherBanksPage,
	FundsTransferInternationalPage,
	FundsTransferSubsidiaryPage,
	AccountsPage,
	LoansPage,
	ChequesCardsPage,
	DepositsWithdrawalsPage,
	FaqsPage,
	OpenNewAccountPage,
	ManageAccountsPage,
	LoanApplicationPage,
	RepayLoanPage,
	LoanRepaymentSchedulePage,
	RequestChequeBookPage,
	RequestCardPage,
	ManageCardsPage,
	StopChequePaymentPage,
	CashDepositPage,
	CashWithdrawalPage,
	ChequeDepositPage,
	BookBusTicketPage,
	BuyRailwayTicketPage,
	BuyFlight2Page,
	BuyFlight3Page,
	BuyRailwayTicket2Page,
	BuyRailwayTicket3Page,
	MiniStatementPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
