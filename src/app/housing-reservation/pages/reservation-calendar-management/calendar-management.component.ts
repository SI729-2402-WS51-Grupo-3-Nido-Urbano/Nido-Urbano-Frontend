/**
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DatePipe, NgIf} from "@angular/common";
import {ReservationCalendarErrorDialog} from "../../components/reservation-calendar-error-dialog/reservation-calendar-error-dialog";
import {MatDialog} from "@angular/material/dialog";
import {Reservation} from "../../model/reservation.entity";
import {ReservationManagementService} from "../../services/reservation-management.service";
import {Router} from '@angular/router';


@Component({
  selector: 'datepicker-inline-calendar-example',
  templateUrl: 'calendar-management.component.html',
  styleUrl: 'calendar-management.component.css',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule, DatePipe, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarManagementComponent {
  selectedDate: Date | null = null; // Fecha actualmente seleccionada
  startDate: Date | null = null; // Fecha de inicio
  endDate: Date | null = null; // Fecha de fin
  currentDate: Date = new Date(); // Fecha actual
  reservations: Reservation[] = [];
  reservedDates: { start: Date; end: Date }[] = []; // Store reserved date ranges
  nextId: number = 1; // Next reservation ID

  constructor(private dialog: MatDialog,
              private reservationManagementService: ReservationManagementService,
              private router: Router) {}

  ngOnInit() {
    this.getNextReservationId(); // Fetch the next available ID on initialization
  }

  getNextReservationId(): void {
    this.reservationManagementService.getNextId().subscribe(
      (nextId) => {
        this.nextId = nextId; // Set the next available ID
      },
      (error) => {
        console.error('Error fetching next reservation ID:', error);
      }
    );
  }

  onDateChange(date: Date | null) {
    if (date && date < this.currentDate) {
      // Si la fecha seleccionada es inferior a la fecha actual
      this.openErrorDialog(); // Abre el diálogo de error
      return;
    }

    if (!this.startDate) {
      // Si no hay fecha de inicio, se establece como la fecha seleccionada
      this.startDate = date;
    } else if (!this.endDate && date && date > this.startDate) {
      // Si ya hay una fecha de inicio y no hay fecha de fin, se establece la fecha seleccionada como fin
      this.endDate = date;
    } else {
      // Si ya hay una fecha de inicio y fin, reiniciar la selección
      this.startDate = date;
      this.endDate = null; // Reiniciar fecha de fin
    }
    this.selectedDate = date; // Actualiza la fecha seleccionada para el calendario
  }

  openErrorDialog(): void {
    this.dialog.open(ReservationCalendarErrorDialog, {
      width: '300px',
    });
  }

  onContinue() {
    if (!this.startDate || !this.endDate) {
      this.openErrorDialog(); // Abre el diálogo de error
      return;
    }

    // Calculate the difference in days between startDate and endDate
    const diffInTime = this.endDate.getTime() - this.startDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24); // Convert milliseconds to days

    // Check if the difference exceeds 2 days
    if (diffInDays > 2) {
      this.openErrorDialog(); // Open the error dialog if the difference is more than 2 days
      return;
    }

    if (this.startDate && this.endDate) {
      console.log(`Start Date: ${this.startDate}, End Date: ${this.endDate}`);

      // Crear la cita con las fechas seleccionadas
      const newReservation: Reservation = {
        id: this.nextId, // Use the calculated next ID
        tenant_name: "Nombre del Inquilino",
        age: 30, // Valor de ejemplo
        tenant_address: "Dirección del Inquilino",
        house_name: "Nombre de la Casa",
        house_address: "Dirección de la Casa",
        landlord_name: "Nombre del Propietario",
        start_date: this.startDate, // Asigna la fecha de inicio seleccionada
        end_date: this.endDate // Asigna la fecha de fin seleccionada
      };

      // Llama al servicio para crear la reserva
      this.reservationManagementService.createReservation(newReservation)
        .subscribe(response => {
          console.log('Reserva creada exitosamente:', response);
          // Resetea las fechas de inicio y fin
          this.startDate = null;
          this.endDate = null;
          // Redirige a la ruta deseada
          this.router.navigate(['housing-reservation/reservations']);
        }, error => {
          console.error('Error al crear la reserva:', error);
          this.openErrorDialog(); // Abre el diálogo en caso de error
        });
    }
  }
}*/

import {ChangeDetectionStrategy, Component, ViewEncapsulation, OnInit} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatCalendarCellClassFunction, MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

import { ReservationManagementService } from "../../services/reservation-management.service";
import { Reservation } from '../../model/reservation.entity';
import { CommonModule } from '@angular/common';

import { TranslateModule } from "@ngx-translate/core";


/** @title Datepicker with custom date classes */
@Component({
  selector: 'datepicker-inline-calendar-example',
  templateUrl: 'calendar-management.component.html',
  styleUrl: 'calendar-management.component.css',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatCardModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CalendarManagementComponent implements OnInit {
  reservedDates: { start: Date, end: Date }[] = []; // Guardará las fechas de las reservas

  constructor(private reservationManagementService: ReservationManagementService) {}

  ngOnInit(): void {
    // Cargar las reservas cuando se inicializa el componente
    this.reservationManagementService.getAllReservations().subscribe((reservations: Reservation[]) => {
      // Mapeamos las fechas de inicio y fin de cada reserva
      this.reservedDates = reservations.map(reservation => ({
        start: new Date(reservation.start_date),
        end: new Date(reservation.end_date)
      }));

      // Ajustar horas a principio y final del día
      this.reservedDates = this.reservedDates.map(range => ({
        start: new Date(range.start.setHours(0, 0, 0, 0)), // Establecer hora a 00:00:00
        end: new Date(range.end.setHours(23, 59, 59, 999)) // Establecer hora a 23:59:59.999
      }));

      console.log(this.reservedDates); // Log para verificar
    });
  }



  // Función que aplica la clase CSS a las fechas del calendario
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      return this.isDateInRange(cellDate) ? 'unavailable-dates' : 'available-dates';
    }
    return '';
  };

  // Función para verificar si la fecha está en algún rango de reserva
  isDateInRange(date: Date): boolean {
    return this.reservedDates.some(range => {
      // Ajustar la fecha de fin a las 23:59:59.999 para incluir el último día completo
      const endDateAdjusted = new Date(range.end);
      endDateAdjusted.setHours(23, 59, 59, 999); // Establecer a 23:59:59.999

      console.log(`Evaluando: ${date} entre ${range.start} y ${endDateAdjusted}`); // Log para verificar evaluaciones
      return date >= range.start && date <= endDateAdjusted; // Incluir el último día en la comparación
    });
  }
}
