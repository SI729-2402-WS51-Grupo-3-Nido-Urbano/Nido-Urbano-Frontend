/*import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackManagementComponent } from './feedback/pages/feedback-management/feedback-management.component';
import { FeedbackCreateAndEditComponent } from './feedback/components/feedback-create-and-edit/feedback-create-and-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: '/feedback-management', pathMatch: 'full' },
  { path: 'feedback-management', component: FeedbackManagementComponent },
  { path: 'house-feedback', component: FeedbackCreateAndEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}*/




import { Routes } from '@angular/router';
import { FeedbackManagementComponent } from './feedback/pages/feedback-management/feedback-management.component';
import { FeedbackCreateAndEditComponent } from './feedback/components/feedback-create-and-edit/feedback-create-and-edit.component';

export const routes: Routes = [
  { path: '', component: FeedbackManagementComponent },
  { path: 'feedback/create', component: FeedbackCreateAndEditComponent },
  { path: 'feedback/edit/:id', component: FeedbackCreateAndEditComponent },
  { path: '**', redirectTo: '' } // Ruta de fallback para 404
];

