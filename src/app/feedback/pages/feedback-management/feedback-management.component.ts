/*import { Component, OnInit } from '@angular/core';
import { FeedbacksService } from '../../services/feedback.service';
import { Feedback } from '../../model/feedback.entity';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";

@Component({
  selector: 'app-feedback-management',
  templateUrl: './feedback-management.component.html',
  standalone: true,
  imports: [
    MatTable,
    NgIf,
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderRow,
    MatButton,
    MatHeaderCellDef,
    MatCellDef,
    MatRowDef,
    MatRow,
    MatHeaderRowDef,
    MatFormField,
    FormsModule,
    MatInput,
    MatLabel,
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardContent,
    NgOptimizedImage,
    NgForOf
  ],
  styleUrls: ['./feedback-management.component.css']
})
export class FeedbackManagementComponent implements OnInit {
  feedbacks: any = {};
  selectedFeedback: Feedback | null = null;
  number: any;
  feedback: any;

  constructor(private feedbackService: FeedbacksService) {}

  ngOnInit(): void {
    this.getAllFeedbacks();
  }

  getAllFeedbacks() {
    // @ts-ignore
    this.feedbackService.getAll().subscribe((data: Feedback[]) => {
      this.feedbacks = data;
    });
  }

  selectFeedback(feedback: Feedback) {
    this.selectedFeedback = feedback;
  }

  deleteFeedback(id: number) {
    if (confirm("Are you sure you want to delete this feedback?")) {
      this.feedbackService.delete(id).subscribe(() => {
        this.getAllFeedbacks();  // Reload the feedback list
      });
    }
  }
}*/

import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../model/feedback.entity';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import { Router } from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-feedback-management',
  templateUrl: './feedback-management.component.html',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatButton,
    MatRowDef,
    CommonModule,
    TranslateModule
  ],
  styleUrls: ['./feedback-management.component.css']
})
export class FeedbackManagementComponent implements OnInit {
  feedbacks: Feedback[] = [];

  constructor(private feedbackService: FeedbackService, private router: Router) { }

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks(): void {
    // La llamada al servicio ahora espera un array de Feedback
    this.feedbackService.getAll().subscribe((data: Feedback[]) => {
      this.feedbacks = data;  // Asignamos el array correctamente
    });
  }

  createNewFeedback(): void {
    // Redirigir a la página de creación de nuevo feedback
    this.router.navigate(['/feedback/create']);
  }
}
