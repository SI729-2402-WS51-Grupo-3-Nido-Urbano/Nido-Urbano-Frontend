import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {HouseCardComponent} from "../../components/house-card/house-card.component";
import { MatTabsModule } from '@angular/material/tabs';
import {House} from "../../../payments/model/house.entity";
import {HousesService} from "../../../payments/services/houses.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf, HouseCardComponent, MatTabsModule, NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  houseData: House;
  housesSale: House[] = [];
  housesRent: House[] = [];

  // Constructor
  constructor(private houseService: HousesService) {
    this.houseData = {} as House;
  }

  ngOnInit() {
    this.loadHousesSale(); // Cambia a 'alquiler' si deseas cargar casas de alquiler
    this.loadHousesRent();
  }

  loadHousesSale() {
    this.houseService.getHousesByType('comprar').subscribe(
      (data) => {
        this.housesSale = data;
        console.log(this.housesSale);
      },
      (error) => {
        console.error('Error fetching houses', error);
      }
    );}

  loadHousesRent() {
    this.houseService.getHousesByType('alquilar').subscribe(
      (data) => {
        this.housesRent = data;
        console.log(this.housesRent);
      },
      (error) => {
        console.error('Error fetching houses', error);
      }
    );}

  /*housesSale = [
    {ownerId: 1, amount: 30000, size: "5", spaces: 5, nearest: "Muy cerca", type: "compra", imageUrl: "https://i.postimg.cc/3NyhYt06/image.png", description: "Muy bonita"},
    {ownerId: 2, amount: 10000, size: "5", spaces: 5, nearest: "Muy cerca", type: "compra", imageUrl: "https://i.postimg.cc/3NyhYt06/image.png", description: "Muy bonita"},
    {ownerId: 3, amount: 20000, size: "5", spaces: 5, nearest: "Muy cerca", type: "compra", imageUrl: "https://i.postimg.cc/3NyhYt06/image.png", description: "Muy bonita"},
    {ownerId: 3, amount: 20000, size: "5", spaces: 5, nearest: "Muy cerca", type: "compra", imageUrl: "https://i.postimg.cc/3NyhYt06/image.png", description: "Muy bonita"},
    {ownerId: 3, amount: 20000, size: "5", spaces: 5, nearest: "Muy cerca", type: "compra", imageUrl: "https://i.postimg.cc/3NyhYt06/image.png", description: "Muy bonita"},
    {ownerId: 3, amount: 20000, size: "5", spaces: 5, nearest: "Muy cerca", type: "compra", imageUrl: "https://i.postimg.cc/3NyhYt06/image.png", description: "Muy bonita"}
  ];

  housesRent = [
    {ownerId: 1, amount: 30000, size: "5", spaces: 5, nearest: "Muy cerca", type: "compra", imageUrl: "https://i.postimg.cc/3NyhYt06/image.png", description: "Muy bonita"},
    {ownerId: 2, amount: 10000, size: "5", spaces: 5, nearest: "Muy cerca", type: "compra", imageUrl: "https://i.postimg.cc/3NyhYt06/image.png", description: "Muy bonita"},
    {ownerId: 3, amount: 20000, size: "5", spaces: 5, nearest: "Muy cerca", type: "compra", imageUrl: "https://i.postimg.cc/3NyhYt06/image.png", description: "Muy bonita"},
    {ownerId: 3, amount: 20000, size: "5", spaces: 5, nearest: "Muy cerca", type: "compra", imageUrl: "https://i.postimg.cc/3NyhYt06/image.png", description: "Muy bonita"},
    {ownerId: 3, amount: 20000, size: "5", spaces: 5, nearest: "Muy cerca", type: "compra", imageUrl: "https://i.postimg.cc/3NyhYt06/image.png", description: "Muy bonita"},
    {ownerId: 3, amount: 20000, size: "5", spaces: 5, nearest: "Muy cerca", type: "compra", imageUrl: "https://i.postimg.cc/3NyhYt06/image.png", description: "Muy bonita"}
  ]*/
}
