import { Routes } from '@angular/router';
import { HomeComponent } from "./public/pages/home/home.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import {PaymentManagmentComponent} from "./payments/pages/payment-managment/payment-managment.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'payments/:id', component: PaymentManagmentComponent },
  { path: '**', component: PageNotFoundComponent }
];
