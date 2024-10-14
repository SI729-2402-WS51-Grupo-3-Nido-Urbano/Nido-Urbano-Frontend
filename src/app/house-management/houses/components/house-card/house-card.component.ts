import {Component, Input} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {NgIf} from "@angular/common";
import {House} from "../../model/house.entity";
import {HousesService} from "../../services/houses.service";
import { Router } from '@angular/router';
import {MatTableModule} from "@angular/material/table"; // Import MatTableModule

export  interface DataColumHouse {
  Attributes: string;
  Values: any;
}

@Component({
  selector: 'app-house-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgIf, MatTableModule], // Add MatTableModule here
  templateUrl: './house-card.component.html',
  styleUrl: './house-card.component.css'
})
export class HouseCardComponent {
  @Input() house!: House;

  displayedColumns: string[] = ['Attributes', 'Values'];
  constructor(private houseService: HousesService, private router: Router) {}

  onBuy(): void {
    this.houseService.setSelectedHouse(this.house);
    this.router.navigate(['/payments', this.house.id]);
  }
}
