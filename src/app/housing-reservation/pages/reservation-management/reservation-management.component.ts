import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatCardModule } from '@angular/material/card';
import { MatSort } from "@angular/material/sort";
import { Reservation } from '../../model/reservation.entity';
import { MatIconModule } from "@angular/material/icon";
import { NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import {ReservationEditAndViewComponent} from "../../components/reservation-edit-and-view/reservation-edit-and-view.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import { Router } from "@angular/router";
import { ReservationsService } from "../../services/reservations.service";

@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  standalone: true,
  imports: [MatPaginator, MatCardModule, MatSort, MatIconModule, MatTableModule, NgClass, TranslateModule, CommonModule, ReservationEditAndViewComponent, MatIconButton, MatButton],
  styleUrls: ['./reservation-management.component.css']
})
export class ReservationManagementComponent implements OnInit {
  reservationData: Reservation[] = [];
  selectedReservation: Reservation | null = null;
  dataSource!: MatTableDataSource<any>;
  //displayedColumns: string[] = ['id', 'start_date', 'end_date', 'actions'];
  isEditMode: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private reservationService: ReservationsService, private router: Router) {}

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
  }

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getAll().subscribe((response: any) => {
      console.log(response);
      this.reservationData = response;
      this.dataSource = new MatTableDataSource(this.reservationData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  createReservation(): void {
    this.selectedReservation = {} as Reservation;
    this.isEditMode = false;
  }

  editReservation(reservation: Reservation): void {
    this.selectedReservation = { ...reservation };
    this.isEditMode = true;
  }

  onReservationAdded(newReservation: Reservation): void {
    this.reservationService.create(newReservation).subscribe((response: Reservation) => {
      console.log('New Reservation Added:', response);

      this.reservationData.push({...response});
      this.reservationData = this.reservationData.map((reservation: Reservation) => {
        return reservation;
      });
      this.selectedReservation = null;
    });
  }

  onReservationUpdated(updatedReservation: Reservation): void {
    this.reservationService.update(updatedReservation.id, updatedReservation).subscribe((response: Reservation) => {
      console.log('Reservation Edited:', response);

      this.reservationData = this.reservationData.map((reservation: Reservation) => {
        if (reservation.id === response.id) {
          return response;
        }
        return reservation;
      });

      this.selectedReservation = null;
    });
  }

  deleteReservations(reservation: Reservation): void {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.reservationService.delete(reservation.id).subscribe(() => {
        this.reservationData = this.reservationData.filter((r: Reservation) => r.id !== reservation.id);
      });
    }
  }

  onEditCanceled(): void {
    this.selectedReservation = null;
  }
}
