import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'error-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: 'reservation-calendar-error-dialog.html',
  styleUrl: 'reservation-calendar-error-dialog.css'
})
export class ReservationCalendarErrorDialog {
  constructor(public dialogRef: MatDialogRef<ReservationCalendarErrorDialog>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
