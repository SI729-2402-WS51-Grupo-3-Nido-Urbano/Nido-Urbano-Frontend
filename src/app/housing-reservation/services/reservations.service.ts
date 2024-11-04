import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import {Reservation} from "../model/reservation.entity";
import {BaseService} from "../../shared/services/base.services";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService extends BaseService<Reservation> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/reservations';
  }
}
