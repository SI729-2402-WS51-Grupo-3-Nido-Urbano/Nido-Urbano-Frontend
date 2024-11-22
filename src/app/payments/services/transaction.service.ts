import { Injectable } from '@angular/core';
import { BaseService} from "../../shared/services/base.services";
import { HttpClient } from "@angular/common/http";
import { Transaction } from "../model/transaction.entity";
import { catchError, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService<Transaction>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/transactions';
  }

  getByPaymentId(paymentId: number): Observable<Transaction[]> {
    const url = `${this.resourcePath()}/payment/${paymentId}`;
    return this.http.get<Transaction[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
