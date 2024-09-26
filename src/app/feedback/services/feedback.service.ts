import { Injectable } from '@angular/core';
import { Feedback } from '../model/feedback.entity';
import { BaseService } from '../../shared/services/base.services';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends BaseService<Feedback> {
  override resourceEndpoint = '/feedbacks'; // Define la ruta para los feedbacks
}

