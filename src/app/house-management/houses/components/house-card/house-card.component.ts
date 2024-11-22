import {Component, Input} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {NgIf} from "@angular/common";
import {House} from "../../model/house.entity";
import {HousesService} from "../../services/houses.service";
import { Router } from '@angular/router';
import {MatTableModule} from "@angular/material/table";
import {FeedbackService} from "../../../../feedback/services/feedback.service"; // Import MatTableModule

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
  constructor(private houseService: HousesService,private feedbackService: FeedbackService, private router: Router) {}

  onBuy(): void {
    this.houseService.setSelectedHouse(this.house);
    this.router.navigate(['/payments', this.house.id]);
  }

  seeFeedbacks(): void {
    if (!this.house || !this.house.id) {
      console.error('House is not defined or does not have a valid ID.');
      return;
    }

    this.houseService.setSelectedHouse(this.house);
    console.log('House ID:', this.house.id);

    const propertyId = this.houseService.getSelectedHouseId();
    if (!propertyId) {
      console.error('Property ID is not defined or invalid.');
      return;
    }

    this.feedbackService.getFeedbacksByPropertyId(propertyId).subscribe(
      (response) => {
        console.log('Feedbacks loaded successfully:', response);
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
      }
    );

    this.router.navigate(['/properties/'+this.house.id+'/feedbacks']);
  }


}
