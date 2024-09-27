import {Component, Input} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {NgIf} from "@angular/common";
import {House} from "../../../payments/model/house.entity";
import {HousesService} from "../../../payments/services/houses.service"; // Para los botones
import { Router } from '@angular/router';

@Component({
  selector: 'app-house-card',
  standalone: true,
  imports: [MatCardModule,     // Importa MatCardModule
    MatButtonModule, NgIf],
  templateUrl: './house-card.component.html',
  styleUrl: './house-card.component.css'
})
export class HouseCardComponent {
  @Input() house!: House;

  constructor(private houseService: HousesService, private router: Router) {}

  onBuy(): void {
    this.houseService.setHouse(this.house);
    this.router.navigate(['/payments', this.house.houseId]); // Navegar a la ruta de pagos con el ID de la casa
  }
}
