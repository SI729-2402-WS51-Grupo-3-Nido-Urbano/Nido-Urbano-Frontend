import { Component, OnInit } from '@angular/core';
import {PaymentFormComponent} from "../../components/payment-form/payment-form.component";
import {House} from "../../model/house.entity";
import {ActivatedRoute, Router} from "@angular/router";
import {HousesService} from "../../services/houses.service";

@Component({
  selector: 'app-confirmation-bcp',
  standalone: true,
  imports: [
    PaymentFormComponent
  ],
  templateUrl: './confirmation-bcp.component.html',
  styleUrl: './confirmation-bcp.component.css'
})
export class ConfirmationBCPComponent implements OnInit{
  house: House | null = null;
  constructor(
    private route: ActivatedRoute,
    private houseService: HousesService,
    private router: Router // Importar el Router para navegar entre rutas
  ) {}

  ngOnInit(): void {
    const houseId = this.route.snapshot.paramMap.get('id'); // Obtener el ID de la casa de la ruta
    if (houseId) {
      // Puedes utilizar el servicio para obtener la casa o recuperar desde el servicio que has creado
      this.house = this.houseService.getHouse(); // Aquí obtienes la casa del servicio
      // O puedes hacer una llamada a la API para obtener la casa por ID, si no usas el servicio compartido
      // this.houseService.getById(houseId).subscribe(house => {
      //   this.house = house;
      // });
    }
  }
}
