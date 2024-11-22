import {Component, OnInit} from '@angular/core';
import {Location, NgIf} from '@angular/common';
import {ContractFormComponent} from "../../components/contract-form/contract-form.component";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contract-form-page',
  standalone: true,
  imports: [
    ContractFormComponent,
    NgIf,
    MatButton
  ],
  templateUrl: './contract-form-page.component.html',
  styleUrl: './contract-form-page.component.css'
})
export class ContractFormPageComponent implements OnInit {
  isLoading: boolean = true;


  constructor(private router: Router) {}

  ngOnInit() {
    // Configura el temporizador de 3 segundos
    setTimeout(() => {
      this.isLoading = false;
    }, 3000); // 3000 ms = 3 segundos
  }

  // Metodo que redirige
  goToHousingReservation(): void {
    this.router.navigate(['/view-available-dates']); // Redirigir a la ruta de reservations
  }
}
