import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {NgIf} from "@angular/common"; // Para los botones

@Component({
  selector: 'app-house-card',
  standalone: true,
  imports: [MatCardModule,     // Importa MatCardModule
    MatButtonModule, NgIf],
  templateUrl: './house-card.component.html',
  styleUrl: './house-card.component.css'
})
export class HouseCardComponent {

}
