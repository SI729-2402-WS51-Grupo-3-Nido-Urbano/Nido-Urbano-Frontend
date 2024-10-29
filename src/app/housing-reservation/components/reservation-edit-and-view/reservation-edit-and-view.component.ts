/*
import { Component } from '@angular/core';

import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm, AbstractControl, ValidatorFn } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {Reservation} from "../../model/reservation.entity";
import {TranslateModule} from "@ngx-translate/core";


@Component({
  selector: 'app-reservation-create-and-edit',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule, TranslateModule],
  templateUrl: './reservation-edit-and-view.component.html',
  styleUrl: './reservation-edit-and-view.component.css'
})
export class ReservationEditAndViewComponent {
  // Attributes
  @Input() reservation: Reservation;
  @Input() editMode: boolean = false;
  @Output() reservationAdded: EventEmitter<Reservation> = new EventEmitter<Reservation>();
  @Output() reservationUpdated: EventEmitter<Reservation> = new EventEmitter<Reservation>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('reservationForm', {static: false}) reservationForm!: NgForm;

  // Methods
  constructor() {
    this.reservation = {} as Reservation;
  }

  // Private methods
  private resetEditState(): void {
    this.reservation = {} as Reservation;
    this.editMode = false;
    this.reservationForm.resetForm();
  }

  // Event Handlers

  onSubmit(): void {
    if (this.reservationForm.form.valid) {
      let emitter: EventEmitter<Reservation> = this.editMode ? this.reservationUpdated : this.reservationAdded;
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
}*/

import { Component, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule, NgForm, AbstractControl, ValidatorFn } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from '@angular/common';
import { Reservation } from "../../model/reservation.entity";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-reservation-create-and-edit',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule, CommonModule, TranslateModule],
  templateUrl: './reservation-edit-and-view.component.html',
  styleUrls: ['./reservation-edit-and-view.component.css']
})
export class ReservationEditAndViewComponent implements AfterViewInit {
  // Attributes
  @Input() reservation: Reservation = {} as Reservation;
  @Input() editMode: boolean = false;
  @Output() reservationAdded: EventEmitter<Reservation> = new EventEmitter<Reservation>();
  @Output() reservationUpdated: EventEmitter<Reservation> = new EventEmitter<Reservation>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('reservationForm', { static: false }) reservationForm!: NgForm;

  // Validator method
  dateRangeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const startDate = control.get('start_date')?.value;
      const endDate = control.get('end_date')?.value;

      if (!startDate || !endDate) {
        return null; // Don't validate if one of the dates is not set
      }

      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffInTime = end.getTime() - start.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24); // Convert milliseconds to days

      return diffInDays > 2 ? { dateRangeInvalid: true } : null; // Return null if valid, otherwise return an error object
    };
  }

  ngAfterViewInit() {
    this.reservationForm.form.setValidators(this.dateRangeValidator());
    this.reservationForm.form.updateValueAndValidity(); // Make sure to update validity
  }

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
