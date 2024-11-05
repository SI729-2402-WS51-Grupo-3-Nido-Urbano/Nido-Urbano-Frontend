import { Routes } from '@angular/router';
import { HomeComponent } from "./public/pages/home/home.component";
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

export const routes: Routes = [
  { path: 'home', component: HousesManagementsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'payments/:id', component: PaymentManagmentComponent },
  { path: 'confirm-payment/:id', component: ConfirmationBCPComponent },
  { path: 'generate', component: ContractFormPageComponent },
  { path: 'reserve-appointments', component: ReservationManagementComponent},
  { path: 'view-available-dates', component: CalendarManagementComponent},
  { path: 'feedbacks', component: FeedbackManagementComponent },
  { path: 'feedbacks/${Id}', component: FeedbackCreateAndEditComponent },
  { path: '**', component: PageNotFoundComponent }
];
