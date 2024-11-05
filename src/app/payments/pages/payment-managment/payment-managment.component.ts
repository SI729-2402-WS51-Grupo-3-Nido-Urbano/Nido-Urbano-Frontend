import { Component, OnInit  } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
//import {House} from "../../model/house.entity";
import {House} from "../../../house-management/houses/model/house.entity";
//import {HousesService} from "../..//houses.service";

import {ActivatedRoute, Router} from '@angular/router';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatGridListModule} from "@angular/material/grid-list";
import {HousesService} from "../../../house-management/houses/services/houses.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-payment-managment',
  standalone: true,
  imports: [MatCardModule,
    MatButtonModule,
    MatIconModule, MatGridList, MatGridTile, MatGridListModule, NgIf],
  templateUrl: './payment-managment.component.html',
  styleUrl: './payment-managment.component.css'
})
export class PaymentManagmentComponent implements OnInit{
  house: House | null = null;
  showPaymentOptions: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private houseService: HousesService,
    private router: Router // Importar el Router para navegar entre rutas
  ) {}

  ngOnInit(): void {
    const houseId = this.route.snapshot.paramMap.get('id');
    if (houseId) {
      this.house = this.houseService.getHouse();
    }
  }

  onBuyButtonClick() {
    this.showPaymentOptions = true;
  }

  // Metodo que redirige de BCP
  goToPaymentConfirmationBCP(): void {
    if (this.house) {
      this.houseService.setHouse(this.house);
      this.router.navigate(['/confirm-payment', this.house.id]); // Redirigir a la ruta de confirmación de pago con el ID de la casa
    }
  }
}
