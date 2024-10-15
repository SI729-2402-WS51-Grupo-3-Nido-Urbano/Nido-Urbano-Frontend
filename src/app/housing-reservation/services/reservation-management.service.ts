// reservation-management.service.ts
import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import { ReservationsService } from "./reservations.service";
import { Reservation } from "../model/reservation.entity";

@Injectable({
  providedIn: 'root'
})
export class ReservationManagementService {
  constructor(private reservationService: ReservationsService) {}

  getAllReservations(): Observable<any> {
    return this.reservationService.getAll();
  }

  createReservation(reservationData: Reservation): Observable<any> {
    return this.reservationService.create(reservationData);
  }

  updateReservation(reservationId: number, reservationData: Reservation): Observable<any> {
    return this.reservationService.update(reservationId, reservationData);
  }

  deleteReservations(reservationId: number): Observable<any> {
    return this.reservationService.delete(reservationId);
  }

  getNextId(): Observable<number> {
    return this.getAllReservations().pipe(
      map((reservations: Reservation[]) => {
        const ids = reservations.map((res: Reservation) => res.id);
        const maxId = Math.max(...ids, 0); // Handle the case where there are no reservations
        return maxId + 1; // Returns the next available ID
      })
    );
  }

  // Validate if the new date range overlaps with any existing reservations
  isDateRangeAvailable(startDate: Date, endDate: Date): Observable<boolean> {
    return this.getAllReservations().pipe(
      map((reservations: Reservation[]) => {
        return !reservations.some(reservation => {
          const existingStart = new Date(reservation.start_date);
          const existingEnd = new Date(reservation.end_date);

          // Check for overlap between the new and existing date ranges
          return (startDate <= existingEnd && endDate >= existingStart);
        });
      })
    );
  }
}
