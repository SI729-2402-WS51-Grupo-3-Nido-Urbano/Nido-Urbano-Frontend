import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractFormPageComponent} from "./contracts/pages/contract-form-page/contract-form-page.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./public/pages/home/home.component";

// Define your routes here
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'generate', component: ContractFormPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },// Ruta por defecto
];

