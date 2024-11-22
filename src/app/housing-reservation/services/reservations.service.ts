import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import {Reservation} from "../model/reservation.entity";
import {BaseService} from "../../shared/services/base.services";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService extends BaseService<Reservation> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/reservations';
  }

  getAllReservations(): Observable<Reservation[]> {
    return this.getAll();
  }

  getReservationById(id: number): Observable<Reservation> {
    return this.getById(id);
  }

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.create(reservation);
  }

  updateReservation(id: number, reservation: Reservation): Observable<Reservation> {
    return this.update(id, reservation);
  }

  deleteReservation(id: number): Observable<void> {
    return this.delete(id);
  }
}
