import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


//import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { IntroPage } from '../pages/intro/intro';
import { RegisterStepTwoPage } from '../pages/register-step-two/register-step-two';
import { RegisterStepThreePage } from '../pages/register-step-three/register-step-three';
import { RegisterPage } from '../pages/register/register';
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
import { MiniStatementPage } from '../pages/mini-statement/mini-statement';

import { AccountsPage } from '../pages/accounts/accounts';
import { LoansPage } from '../pages/loans/loans';
import { ChequesCardsPage } from '../pages/cheques-cards/cheques-cards';
import { DepositsWithdrawalsPage } from '../pages/deposits-withdrawals/deposits-withdrawals';
import { FaqsPage } from '../pages/faqs/faqs';
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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = IntroPage;
	@ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  
	openPage(page)
	{
		let params = {};
		if(page=='mini-statement')
			this.nav.setRoot(MiniStatementPage, params);
		else if(page=='accounts')
			this.nav.setRoot(AccountsPage, params);
		else if(page=='funds-transfer')
			this.nav.setRoot(FundsTransferPage, params);
		else if(page=='airtime-top-up')
			this.nav.setRoot(MobileTopUpPage, params);
		else if(page=='bill-payments')
			this.nav.setRoot(BillPaymentPage, params);
		else if(page=='loans')
			this.nav.setRoot(LoansPage, params);
		else if(page=='cheques-cards')
			this.nav.setRoot(ChequesCardsPage, params);
		else if(page=='deposits-withdrawals')
			this.nav.setRoot(DepositsWithdrawalsPage, params);
		else if(page=='account-officer')
			this.nav.setRoot(BillPaymentPage, params);
		else if(page=='pay-school-fees')
			this.nav.setRoot(PaySchoolFeesPage, params);
		else if(page=='profile-management')
			this.nav.setRoot(BillPaymentPage, params);
		else if(page=='faqs')
			this.nav.setRoot(FaqsPage, params);
		else if(page=='analysis')
			this.nav.setRoot(AnalysisPage, params);
		else if(page=='dashboard')
			this.nav.setRoot(DashboardPage, params);
			
		this.menuCtrl.toggle();
	}
	
	
	logout()
	{
		console.log("test");
	}
}

