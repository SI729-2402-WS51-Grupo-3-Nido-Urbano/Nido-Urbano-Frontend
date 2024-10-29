import { Injectable } from '@angular/core';

import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import {Reservation} from "../model/reservation.entity";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService extends BaseService<Reservation> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/reservations';
  }
}
