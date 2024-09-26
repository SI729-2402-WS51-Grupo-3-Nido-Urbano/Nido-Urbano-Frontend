import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Feedback } from '../../model/feedback.entity';
import { FeedbackService } from '../../services/feedback.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatFormField} from "@angular/material/form-field";
import {FormsModule, NgForm} from "@angular/forms";
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
export class FeedbackCreateAndEditComponent {
  // Inputs and Outputs
  @Input() feedback: Feedback = {} as Feedback;
  @Input() editMode: boolean = false;
  @Output() feedbackAdded: EventEmitter<Feedback> = new EventEmitter<Feedback>();
  @Output() feedbackUpdated: EventEmitter<Feedback> = new EventEmitter<Feedback>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('feedbackForm', { static: false }) feedbackForm!: NgForm;

  constructor() {
    this.feedback = {} as Feedback;
  }

  // Private method to reset form and edit state
  private resetEditState(): void {
    this.feedback = {} as Feedback;
    this.editMode = false;
    this.feedbackForm.resetForm();
  }

  // Event handler for form submission
  onSubmit(): void {
    if (this.feedbackForm.form.valid) {
      let emitter: EventEmitter<Feedback> = this.editMode ? this.feedbackUpdated : this.feedbackAdded;
      emitter.emit(this.feedback);
      this.resetEditState();
    } else {
      console.error('Invalid data in form');
    }
  }

  // Event handler for cancel button
  onCancel(): void {
    this.editCanceled.emit();
    this.resetEditState();
  }
}
