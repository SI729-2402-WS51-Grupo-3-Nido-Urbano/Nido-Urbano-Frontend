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
