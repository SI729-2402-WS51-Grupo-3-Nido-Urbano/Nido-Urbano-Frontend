import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Reservation } from '../../model/reservation.entity';
import { ReservationManagementService } from "../../services/reservation-management.service";
import { MatIconModule } from "@angular/material/icon";
import { NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import {ReservationEditAndViewComponent} from "../../components/reservation-edit-and-view/reservation-edit-and-view.component";

@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  standalone: true,
  imports: [MatPaginator, MatSort, MatIconModule, MatTableModule, NgClass, TranslateModule, ReservationEditAndViewComponent],
  styleUrls: ['./reservation-management.component.css']
})
export class ReservationManagementComponent implements OnInit, AfterViewInit {
  reservationData: Reservation;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'start_date', 'end_date', 'actions'];
  isEditMode: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private reservationService: ReservationManagementService) {
    this.reservationData = {} as Reservation;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.reservationData = {} as Reservation;
  }

  ngOnInit(): void {
    this.getAllReservations();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private getAllReservations(): void {
    this.reservationService.getAllReservations().subscribe((response: Reservation[]) => {
      this.dataSource.data = response;
    });
  }

  onEditItem(element: Reservation): void {
    this.isEditMode = true;
    this.reservationData = element;
  }

  onDeleteItem(element: Reservation): void {
    this.deleteReservations(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllReservations();
  }

  onReservationAdded(element: Reservation) {
    this.reservationData = element;
    this.createReservation();
    this.resetEditState();
  }

  onReservationUpdated(element: Reservation) {
    this.reservationData = element;
    this.updateReservation();
    this.resetEditState();
  }

  private createReservation(): void {
    this.reservationService.createReservation(this.reservationData)
      .subscribe((response: Reservation) => {
        this.dataSource.data.push(response);
        this.dataSource.data = [...this.dataSource.data]; // refresh table
      });
  }

  private updateReservation(): void {
    this.reservationService.updateReservation(this.reservationData.id, this.reservationData)
      .subscribe((response: Reservation) => {
        const index = this.dataSource.data.findIndex(r => r.id === response.id);
        this.dataSource.data[index] = response;
        this.dataSource.data = [...this.dataSource.data]; // refresh table
      });
  }

  private deleteReservations(reservationId: number): void {
    this.reservationService.deleteReservations(reservationId)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(reservation => reservation.id !== reservationId);
      });
  }
}
