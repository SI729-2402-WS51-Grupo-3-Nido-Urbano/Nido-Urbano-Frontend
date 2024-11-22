import { Injectable } from '@angular/core';
import { Feedback } from '../model/feedback.entity';
import { BaseService } from '../../shared/services/base.services';
import {catchError, Observable, retry} from "rxjs";
import {House} from "../../house-management/houses/model/house.entity";


@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends BaseService<Feedback> {
  override resourceEndpoint = '/feedbacks';

  getFeedbacksByPropertyId(propertyId: number): Observable<Feedback[]>
  {
    const url = `${this.basePath}/properties/${propertyId}${this.resourceEndpoint}`;

    console.log('Request URL:', url); // Depuración

    // Realizar la solicitud HTTP con manejo de errores
    return this.http.get<Feedback[]>(url, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
}

