import { ChangeDetectionStrategy, Component, ViewEncapsulation, OnInit, ChangeDetectorRef } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReservationManagementService } from "../../services/reservation-management.service";
import { Reservation } from '../../model/reservation.entity';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'datepicker-inline-calendar-example',
  templateUrl: 'calendar-management.component.html',
  styleUrls: ['calendar-management.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDatepickerModule, MatCardModule, TranslateModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarManagementComponent implements OnInit {
  reservedDates: { start: Date, end: Date }[] = [];

  constructor(
    private reservationManagementService: ReservationManagementService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.reservationManagementService.getAllReservations().subscribe((reservations: Reservation[]) => {
      this.reservedDates = reservations.map(reservation => ({
        start: new Date(reservation.start_date),
        end: new Date(reservation.end_date)
      }));

      // Ajustar horas a principio y final del día
      this.reservedDates = this.reservedDates.map(range => ({
        start: new Date(range.start.setHours(0, 0, 0, 0)), // Inicio del día
        end: new Date(range.end.setHours(23, 59, 59, 999)) // Fin del día
      }));

      console.log(this.reservedDates); // Log para verificar

      // Usar setTimeout para forzar la actualización del calendario
      setTimeout(() => {
        this.cdr.detectChanges(); // Forzar detección de cambios
      }, 0);
    });
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      return this.isDateInRange(cellDate) ? 'unavailable-dates' : '';
    }
    return '';
  };

  isDateInRange(date: Date): boolean {
    return this.reservedDates.some(range => {
      const endDateAdjusted = new Date(range.end);
      endDateAdjusted.setHours(23, 59, 59, 999); // Fin del día
      return date >= range.start && date <= endDateAdjusted;
    });
  }
}
