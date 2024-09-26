import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-payment-managment',
  standalone: true,
  imports: [MatCardModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './payment-managment.component.html',
  styleUrl: './payment-managment.component.css'
})
export class PaymentManagmentComponent {

}