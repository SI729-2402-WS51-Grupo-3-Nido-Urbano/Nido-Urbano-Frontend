/*import { BaseService } from '../../shared/services/base.services';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../model/feedback.entity';

@Injectable({
  providedIn: 'root'
})
export class FeedbacksService extends BaseService<Feedback>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/feedbacks'
  }

  getFeedbacks(): Observable<any> {
  return this.getAll();
}
}*/


// feedback.service.ts
import { Injectable } from '@angular/core';
import { Feedback } from '../model/feedback.entity';
import { BaseService } from '../../shared/services/base.services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends BaseService<Feedback> {
  override resourceEndpoint = '/feedbacks'; // Define la ruta para los feedbacks
}

