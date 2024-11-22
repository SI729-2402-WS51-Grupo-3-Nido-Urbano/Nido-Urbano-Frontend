import { Injectable } from '@angular/core';
import { BaseService} from "../../shared/services/base.services";
import { HttpClient } from "@angular/common/http";
import { Payment } from "../model/payment.entity";
import { catchError, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService<Payment> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/payments';
  }

  /**
   * Obtiene los pagos asociados a un PaymentManagementId
   * @param paymentManagementId - ID de la gestión de pago
   * @returns Observable con la lista de pagos
   */
  getByPaymentManagementId(paymentManagementId: number): Observable<Payment[]> {
    const url = `${this.resourcePath()}/paymentManagement/${paymentManagementId}`;
    return this.http.get<Payment[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
