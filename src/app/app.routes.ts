import { Routes } from '@angular/router';
import { HomeComponent } from "./public/pages/home/home.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { PaymentManagmentComponent } from "./payments/pages/payment-managment/payment-managment.component";
import { ConfirmationBCPComponent } from "./payments/pages/confirmation-bcp/confirmation-bcp.component";
import { ContractFormPageComponent} from "./contracts/pages/contract-form-page/contract-form-page.component";
import {HousesManagementsComponent} from "./house-management/houses/pages/houses-managements/houses-managements.component";


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'payments/:id', component: PaymentManagmentComponent },
  { path: 'confirm-payment/:id', component: ConfirmationBCPComponent },
  { path: 'generate', component: ContractFormPageComponent },
  { path: 'houses', component: HousesManagementsComponent },

  { path: '**', component: PageNotFoundComponent }
];
