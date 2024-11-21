import {Component, OnInit} from '@angular/core';
import {House} from "../../model/house.entity";
import {HousesService} from "../../services/houses.service";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {HouseCardComponent} from "../../components/house-card/house-card.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-houses-managements',
  standalone: true,
  imports: [
    CommonModule,
    MatTabGroup,
    MatTab,
    HouseCardComponent
  ],
  templateUrl: './houses-managements.component.html',
  styleUrl: './houses-managements.component.css'
})
export class HousesManagementsComponent implements OnInit {

  houseData: House;
  houseSale: House[] = [];
  houseRent: House[] = [];
  activeTab: string = 'SALE';

  constructor(private houseService: HousesService) {
    this.houseData = {} as House;
  }

  ngOnInit() {
    this.loadHouses();
  }

  loadHouses() {
    if (this.activeTab === 'SALE') {
      this.houseService.getHouseByHouseModal('SALE').subscribe(
        (data) => {
          this.houseSale = data;
          console.log(this.houseSale);
        },
        (error) => {
          console.error('Error fetching houses for sale', error);
        }
      );
    } else if (this.activeTab === 'RENTAL') {
      this.houseService.getHouseByHouseModal('RENTAL').subscribe(
        (data) => {
          this.houseRent = data;
          console.log(this.houseRent);
        },
        (error) => {
          console.error('Error fetching houses for rent', error);
        }
      );
    }
  }

  onTabChange(index: number) {
    this.activeTab = index === 0 ? 'SALE' : 'RENTAL';
    this.loadHouses();
  }
}
