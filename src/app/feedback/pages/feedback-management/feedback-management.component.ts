import { CommonModule  } from '@angular/common';
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
import {
  FeedbackCreateAndEditComponent
} from "../../components/feedback-create-and-edit/feedback-create-and-edit.component";

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
    TranslateModule,
    FeedbackCreateAndEditComponent
  ],
  styleUrls: ['./feedback-management.component.css']
})
export class FeedbackManagementComponent implements OnInit {
  feedbacks: Feedback[] = [];
  selectedFeedback: Feedback | null = null;
  editMode: boolean = false;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  // Cargar feedbacks desde el servicio
  loadFeedbacks(): void {
    this.feedbackService.getAll().subscribe((response: any) => {
      this.feedbacks = response;
    });
  }

  // Crear nuevo feedback
  createNewFeedback(): void {
    this.selectedFeedback = {} as Feedback;
    this.editMode = false;
  }

  // Editar feedback
  editFeedback(feedback: Feedback): void {
    this.selectedFeedback = { ...feedback };
    this.editMode = true;
  }

  // Eliminar feedback
  deleteFeedback(feedback: Feedback): void {
    if (confirm('Are you sure you want to delete this feedback?')) {
      this.feedbackService.delete(feedback.id).subscribe(() => {
        this.feedbacks = this.feedbacks.filter((fb: Feedback) => fb.id !== feedback.id);
      });
    }
  }

  // Manejar la adición de un nuevo feedback
  onFeedbackAdded(newFeedback: Feedback): void {
    this.feedbackService.create(newFeedback).subscribe((response: Feedback) => {
      console.log('New Feedback Added:', response);

      this.feedbacks.push({...response});
      this.feedbacks = this.feedbacks.map((feedback: Feedback) => {
        return feedback;
      });
      this.selectedFeedback = null;
    });
  }



  // Manejar la actualización de un feedback existente
  onFeedbackUpdated(updatedFeedback: Feedback): void {
    this.feedbackService.update(updatedFeedback.id, updatedFeedback).subscribe((response: Feedback) => {
      console.log('Feedback Edited:', response);

      this.feedbacks = this.feedbacks.map((feedback: Feedback) => {
        if (feedback.id === response.id) {
          return response;
        }
        return feedback;
      });

      this.selectedFeedback = null;
    });
  }

  // Cancelar la edición o creación
  onEditCanceled(): void {
    this.selectedFeedback = null;
  }
}
