import { Component, OnInit  } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {House} from "../../model/house.entity";
import {HousesService} from "../../services/houses.service";
import {ActivatedRoute, Router} from '@angular/router';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

@Component({
  selector: 'app-payment-managment',
  standalone: true,
  imports: [MatCardModule,
    MatButtonModule,
    MatIconModule, MatGridList, MatGridTile],
  templateUrl: './payment-managment.component.html',
  styleUrl: './payment-managment.component.css'
})
export class PaymentManagmentComponent implements OnInit{
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

  // Metodo que redirige de BCP
  goToPaymentConfirmationBCP(): void {
    if (this.house) {
      this.router.navigate(['/confirm-payment', this.house.ownerId]); // Redirigir a la ruta de confirmación de pago con el ID de la casa
    }
  }
}
