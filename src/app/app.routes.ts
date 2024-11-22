import { Routes } from '@angular/router';
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { PaymentManagmentComponent } from "./payments/pages/payment-managment/payment-managment.component";
import { ConfirmationBCPComponent } from "./payments/pages/confirmation-bcp/confirmation-bcp.component";
import { ContractFormPageComponent} from "./contracts/pages/contract-form-page/contract-form-page.component";
import {HousesManagementsComponent} from "./house-management/houses/pages/houses-managements/houses-managements.component";

import { FeedbackManagementComponent } from './feedback/pages/feedback-management/feedback-management.component';
import { FeedbackCreateAndEditComponent } from './feedback/components/feedback-create-and-edit/feedback-create-and-edit.component';
import {
  ReservationManagementComponent
} from "./housing-reservation/pages/reservation-management/reservation-management.component";
import {
  CalendarManagementComponent
} from "./housing-reservation/pages/reservation-calendar-management/calendar-management.component";
import {
  HouseManagementLessorComponent
} from "./house-management/houses/pages/house-management-lessor/house-management-lessor.component";
import {HousesAddsComponent} from "./house-management/houses/pages/houses-adds/houses-adds.component";
import {PaymentManagementsComponent} from "./payments/pages/payment-managements/payment-managements.component";
import {PaymentsComponent} from "./payments/pages/payments/payments.component";
import {TransactionsComponent} from "./payments/pages/transactions/transactions.component";
import {SignInComponent} from "./iam/pages/sign-in/sign-in.component";
import {SignUpComponent} from "./iam/pages/sign-up/sign-up.component";

export const routes: Routes = [
  { path: 'home', component: HousesManagementsComponent },
  {path: 'property', component: HouseManagementLessorComponent},
  {path: 'propertyTools', component: HousesAddsComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'payments/:id', component: PaymentManagmentComponent },
  { path: 'confirm-payment/:id', component: ConfirmationBCPComponent },
  { path: 'generate', component: ContractFormPageComponent },
  { path: 'reserve-appointments', component: ReservationManagementComponent},
  { path: 'view-available-dates', component: CalendarManagementComponent},
  { path: 'feedbacks', component: FeedbackManagementComponent },
  { path: 'properties/:houseId/feedbacks', component: FeedbackManagementComponent },

  { path: 'paymentManagements', component: PaymentManagementsComponent },
  { path: 'payments/paymentManagement/:id', component: PaymentsComponent },
  { path: 'transactions/payment/:id', component: TransactionsComponent },

  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  //{ path: 'learning/students', component: StudentManagementComponent, canActivate: [authenticationGuard] },


  //{ path: 'properties/:houseId/feedbacks', component: FeedbackCreateAndEditComponent },
  { path: '**', component: PageNotFoundComponent }
];
