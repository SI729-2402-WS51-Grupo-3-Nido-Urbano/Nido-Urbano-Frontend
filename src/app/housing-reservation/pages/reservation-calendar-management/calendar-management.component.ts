import { ChangeDetectionStrategy, Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Reservation } from '../../model/reservation.entity';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { ReservationsService } from "../../services/reservations.service";
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'calendar-management',
  templateUrl: 'calendar-management.component.html',
  styleUrls: ['calendar-management.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatCardModule,
    TranslateModule,
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatInput,
  ],
  providers: [provideNativeDateAdapter()], // Add the DateAdapter provider here
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarManagementComponent implements OnInit {
  startDate: Date | null = null;
  endDate: Date | null = null;
  reservedDates: { start: Date, end: Date }[] = [];

  reservation: Reservation = {
    id: 1,
    houseAddress: '',
    houseName: '',
    tenantName: '',
    tenantAddress: '',
    houseId: 1,
    startDate: new Date(),
    endDate: new Date(),
  };

  constructor(
    private router: Router,
    private reservationService: ReservationsService
  ) {}

  ngOnInit(): void {
    // Obtener las reservas previas si es necesario
    this.reservationService.getAllReservations().subscribe({
      next: (reservations: Reservation[]) => {
        // Procesar las reservas obtenidas
      },
      error: (err) => {
        console.error('Error al obtener reservas:', err);
        alert('No se pudo cargar la información de las reservas.');
      }
    });
  }

  saveReservation(): void {
    // Validar si las fechas seleccionadas son correctas
    if (this.startDate && this.endDate && this.startDate <= this.endDate) {
      // Crear el objeto de reserva con los datos del formulario
      const newReservation: Reservation = {
        id: 1,
        houseAddress: this.reservation.houseAddress,
        houseName: this.reservation.houseName,
        tenantName: this.reservation.tenantName,
        tenantAddress: this.reservation.tenantAddress,
        houseId: this.reservation.houseId,
        startDate: this.startDate,
        endDate: this.endDate,
      };

      // Enviar los datos al backend para guardar la reserva
      this.reservationService.createReservation(newReservation).subscribe({
        next: () => {
          alert('Reserva guardada correctamente.');
          this.resetForm();  // Resetear el formulario después de guardar
          this.ngOnInit();   // Refrescar las reservas
        },
        error: (err) => {
          console.error('Error al guardar la reserva:', err);
          alert('No se pudo guardar la reserva. Inténtalo más tarde.');
        }
      });
    } else {
      alert('Rango de fechas inválido. Asegúrate de que la fecha de inicio sea antes que la de fin.');
    }
  }

  // Método para resetear el formulario después de guardar
  resetForm(): void {
    this.startDate = this.endDate = null;
    this.reservation = {
      id: 1,
      houseAddress: '',
      houseName: '',
      tenantName: '',
      tenantAddress: '',
      houseId: 1,
      startDate: new Date(),
      endDate: new Date(),
    };
  }


  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      return this.isDateInRange(cellDate) ? 'unavailable-dates' : '';
    }
    return '';
  };

  isDateInRange(date: Date): boolean {
    return this.reservedDates.some(range =>
      date >= range.start && date <= range.end
    );
  }

  goToAvailableDates(): void {
    this.router.navigate(['/view-available-dates']);
  }
}
