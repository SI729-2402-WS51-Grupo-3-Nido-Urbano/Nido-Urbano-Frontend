import { Component, OnInit } from '@angular/core';
import {PaymentFormComponent} from "../../components/payment-form/payment-form.component";
import {House} from "../../model/house.entity";
import {ActivatedRoute, Router} from "@angular/router";
import {HousesService} from "../../services/houses.service";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatGridList} from "@angular/material/grid-list";
import {MatIcon} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {PaysService} from "../../services/pays.service";
import {FormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {Pay} from "../../model/pay.entity";
import {MatInput} from "@angular/material/input";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-confirmation-bcp',
  standalone: true,
  imports: [
    PaymentFormComponent,
    MatCard,
    MatButton,
    MatGridList,
    MatIcon,
    MatGridListModule,
    MatCardContent,
    MatCardTitle,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './confirmation-bcp.component.html',
  styleUrl: './confirmation-bcp.component.css'
})
export class ConfirmationBCPComponent implements OnInit{

  house: House;
  pay: Pay; // Objeto para almacenar la información del pago

  constructor(
    private route: ActivatedRoute,
    private houseService: HousesService,
    private paysService: PaysService,
  ) {this.pay = new Pay();
    this.house = new House();}

  ngOnInit(): void {
    const houseId = this.route.snapshot.paramMap.get('id'); // Obtener el ID de la casa de la ruta
    if (houseId) {
      // Puedes utilizar el servicio para obtener la casa o recuperar desde el servicio que has creado
      this.house = this.houseService.getHouse(); // Aquí obtienes la casa del servicio
    }
  }

  private createPayment(): void {
    this.paysService.create(this.pay).subscribe({
      next: (response) => {
        console.log('Pago creado exitosamente:', response);
        // Aquí puedes realizar otras acciones después de guardar el pago, como redirigir o mostrar un mensaje
      },
      error: (error) => {
        console.error('Error al crear el pago:', error);
      }
    });
  };

  onSubmit(): void {
    this.pay.paymentId = Math.floor(Math.random() * 10000);
    this.pay.houseId = this.house?.houseId;
    this.pay.amountSale = this.house?.amount;
    this.pay.houseId = this.house?.houseId;
    this.pay.amountSale = this.house?.amount;
    console.log('Información del Pago:', this.pay);
    // Aquí puedes manejar el envío del objeto pay a tu base de datos o servicio
    // Por ejemplo, puedes hacer una llamada a un servicio para guardar en db.json

    this.createPayment();
  }
}
