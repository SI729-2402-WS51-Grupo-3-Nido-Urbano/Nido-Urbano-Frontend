import { Injectable } from '@angular/core';
import { BaseService} from "../../shared/services/base.services";
import { HttpClient } from "@angular/common/http";
import { PaymentManagement } from "../model/payment-management.entity";

@Injectable({
  providedIn: 'root'
})
export class PaymentManagementService extends BaseService<PaymentManagement> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/paymentManagements';
  }
}
