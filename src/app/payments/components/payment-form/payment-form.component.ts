import {Component, Input, OnInit} from '@angular/core';
import {House} from "../../model/house.entity";
import {Pay} from "../../model/pay.entity";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {MatLabel} from "@angular/material/form-field";
import {Router} from "@angular/router";
import {HousesService} from "../../services/houses.service";

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    FormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatButton,
    NgForOf,
    MatLabel
  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent implements OnInit{
  @Input() house!: House;

  constructor(
    private houseService: HousesService,
    private router: Router // Importar el Router para navegar entre rutas
  ) {
  }

  ngOnInit(): void {
    this.houseService.setHouse(this.house);
    this.router.navigate(['/confirm-payment', this.house.houseId]); // Navegar a la ruta de pagos con el ID de la casa
  }
}
