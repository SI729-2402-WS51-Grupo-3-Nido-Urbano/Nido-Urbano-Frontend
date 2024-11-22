import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { Reservation } from "../../model/reservation.entity";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-reservation-create-and-edit',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule, TranslateModule],
  templateUrl: './reservation-edit-and-view.component.html',
  styleUrls: ['./reservation-edit-and-view.component.css']
})
export class ReservationEditAndViewComponent {
  // Attributes
  @Input() reservation: Reservation = {} as Reservation;
  @Input() editMode: boolean = false;
  @Output() reservationAdded: EventEmitter<Reservation> = new EventEmitter<Reservation>();
  @Output() reservationUpdated: EventEmitter<Reservation> = new EventEmitter<Reservation>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('reservationForm', { static: false }) reservationForm!: NgForm;

  constructor() {}

  // Private methods
  private resetEditState(): void {
    this.reservation = {} as Reservation;
    this.editMode = false;
    this.reservationForm.resetForm();
  }

  // Event Handlers
  onSubmit(): void {
    if (this.reservationForm.valid) {
      const emitter: EventEmitter<Reservation> = this.editMode ? this.reservationUpdated : this.reservationAdded;
      emitter.emit(this.reservation);
      this.resetEditState();
    } else {
      console.error('Invalid data in form');
    }
  }

  onCancel(): void {
    this.editCanceled.emit();
    this.resetEditState();
  }
}
