import { Component } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { HousesService} from "../../services/houses.service";
import { House} from "../../model/house.entity";
import {CurrencyPipe, NgClass, NgIf} from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButton, MatIconButton} from "@angular/material/button";
import {HouseEditComponent} from "../../components/house-edit/house-edit.component";
import {Router} from "@angular/router";
import {HousesAddsComponent} from "../houses-adds/houses-adds.component";
@Component({
  selector: 'app-house-management-lessor',
  standalone: true,
  imports: [
    MatPaginator,
    MatSort,
    MatIconModule,

    MatTableModule,
    NgClass,
    TranslateModule,
    MatFormField,
    FormsModule,
    CurrencyPipe, MatFormFieldModule,
    MatInputModule, MatButton, MatIconButton, HouseEditComponent, NgIf
  ],
  templateUrl: './house-management-lessor.component.html',
  styleUrl: './house-management-lessor.component.css'
})
export class HouseManagementLessorComponent  {
  displayedColumns: string[] = ['house_name', 'address', 'house_type', 'house_modal', 'price', 'size', 'description', 'status_landlord', 'actions'];
  dataSource: MatTableDataSource<House> = new MatTableDataSource<House>();
  userPropertyId: string = '';
  isEditing: boolean = false;
  selectedHouse!: House;

  constructor(private housesService: HousesService, public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.getAllHouses();
  }


  getAllHouses(): void {
    this.housesService.getAll().subscribe(
      (houses: any) => {
        if (Array.isArray(houses)) {
          this.dataSource.data = houses as House[];
        } else {
          this.dataSource.data = [houses] as House[];
        }
      },
      (error) => {
        console.error('Error fetching houses', error);
      }
    );
  }


  editHouse(house: House): void {
    this.isEditing = true;
    this.selectedHouse = house;
    this.openHouseDialog(house);
  }

  filterHousesByUserId(): void {
    if (this.userPropertyId) {
      this.housesService.getAllHouseByUserId(+this.userPropertyId).subscribe(
        (houses: House[]) => {
          this.dataSource.data = houses;
        },
        (error) => {
          console.error('Error fetching houses by user property ID', error);
        }
      );
    } else {
      this.getAllHouses();
    }
  }
//redireccionar a la pagina de agregar casa
  openAddHouseDialog(): void {
    const dialogRef = this.dialog.open(HousesAddsComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllHouses();
      }
    });
  }

  deleteHouse(id: number): void {
    this.housesService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(h => h.id !== id);
    }, error => {
      console.error('Error deleting house', error);
    });
  }
  saveHouse(house: House): void {
    if (house.id) {

      this.housesService.update(house.id, house).subscribe(
        () => {
          this.getAllHouses();
          this.cancelEdit();
        },
        (error) => {
          console.error('Error updating house', error);
        }
      );
    }
  }
  cancelEdit(): void {
    this.isEditing = false;
    this.selectedHouse = {} as House;
  }
  openHouseDialog(house?: House): void {

    const dialogRef = this.dialog.open(HouseEditComponent, {
      data: house || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        const index = this.dataSource.data.findIndex(h => h.id === result.id);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource.data = [...this.dataSource.data];
        }
      }
    });
  }
}
