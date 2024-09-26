import { Routes } from '@angular/router';

import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { ReservationManagementComponent } from "./housing-reservation/pages/reservation-management/reservation-management.component";
import { CalendarManagementComponent } from "./housing-reservation/pages/reservation-calendar-management/calendar-management.component"

export const routes: Routes = [
  { path: 'housing-reservation/calendar', component: CalendarManagementComponent },
  { path: 'housing-reservation/reservations', component: ReservationManagementComponent },
  { path: '', redirectTo: 'housing-reservation/calendar', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
