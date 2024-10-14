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
export class HousesManagementsComponent implements OnInit{

  houseData: House;
  houseSale: House[]=[];
  houseRent: House[]=[];

  constructor(private houseService: HousesService) {
    this.houseData = {} as House;
  }
  loadHouseSale(){
    this.houseService.getHouseByHouseModal('SALE').subscribe((data)=>{
      this.houseSale = data;
      console.log(this.houseSale);
    },
      (error)=>{
      console.error('Error fetching house',error);
    }
    );
  }
  loadHouseRent(){
    this.houseService.getHouseByHouseModal('RENTAL').subscribe((data)=>{
        this.houseRent = data;
        console.log(this.houseRent);
      },
      (error)=>{
        console.error('Error fetching house',error);
      }
    );
  }
  ngOnInit() {
    this.loadHouseSale();
    this.loadHouseRent();
  }

}
