/*import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../model/feedback.entity';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-house-feedback',
  templateUrl: './feedback-create-and-edit.component.html',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardHeader,
    NgForOf,
    MatCardContent,
    MatCardActions,
    MatCardImage,
    MatButton,
    MatCardSubtitle,
    NgOptimizedImage
  ],
  styleUrls: ['./feedback-create-and-edit.component.css']
})
export class FeedbackCreateAndEditComponent implements OnInit {
  feedbacks: Feedback[] = [];

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks() {
    // @ts-ignore
    this.feedbackService.getAll().subscribe((data: Feedback[]) => {
      this.feedbacks = data;
    });
  }
}*/


import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../model/feedback.entity';
import { FeedbackService } from '../../services/feedback.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-feedback-create-and-edit',
  templateUrl: './feedback-create-and-edit.component.html',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatButton,
    TranslateModule,
    MatTable
  ],
  styleUrls: ['./feedback-create-and-edit.component.css']
})
/*export class FeedbackCreateAndEditComponent implements OnInit {
  feedback: Feedback = new Feedback();
  isEditMode: boolean = false;

  constructor(private feedbackService: FeedbackService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      // Convierte el id a número si es necesario
      this.feedbackService.getById(+id).subscribe((data: Feedback) => {
        this.feedback = data; // Asignamos el objeto feedback que viene del servicio
      });
    }
  }

  saveFeedback(): void {
    if (this.isEditMode) {
      this.feedbackService.update(this.feedback.rating_id, this.feedback).subscribe();
    } else {
      this.feedbackService.create(this.feedback).subscribe();
    }
  }
}*/


export class FeedbackCreateAndEditComponent implements OnInit {
  feedback: Feedback = new Feedback();
  isEditMode: boolean = false;

  constructor(
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
    private router: Router  // Inyectamos el Router aquí
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      // Convierte el id a número si es necesario
      this.feedbackService.getById(+id).subscribe((data: Feedback) => {
        this.feedback = data;  // Asignamos el objeto feedback que viene del servicio
      });
    }
  }

  saveFeedback(): void {
    if (this.isEditMode) {
      this.feedbackService.update(this.feedback.rating_id, this.feedback).subscribe(() => {
        this.router.navigate(['/']);  // Redirigimos a la lista de feedbacks después de editar
      });
    } else {
      this.feedbackService.create(this.feedback).subscribe(() => {
        this.router.navigate(['/']);  // Redirigimos a la lista de feedbacks después de crear
      });
    }
  }
}
