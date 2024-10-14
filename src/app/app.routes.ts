
import { Routes } from '@angular/router';
import { FeedbackManagementComponent } from './feedback/pages/feedback-management/feedback-management.component';
import { FeedbackCreateAndEditComponent } from './feedback/components/feedback-create-and-edit/feedback-create-and-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'feedbacks', pathMatch: 'full' },
  { path: 'feedbacks', component: FeedbackManagementComponent },
  //{ path: 'feedback/create', component: FeedbackCreateAndEditComponent },
  { path: 'feedbacks/${Id}', component: FeedbackCreateAndEditComponent },
  { path: '**', redirectTo: '' }
];

