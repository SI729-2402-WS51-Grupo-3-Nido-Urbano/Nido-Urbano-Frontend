import { Component, Input } from '@angular/core';
import { PaymentManagementCardComponent } from "../payment-management-card/payment-management-card.component";
import { NgForOf } from "@angular/common";
import { PaymentManagement } from "../../model/payment-management.entity";

@Component({
  selector: 'app-payment-management-card-list',
  standalone: true,
  imports: [
    PaymentManagementCardComponent,
    NgForOf
  ],
  templateUrl: './payment-management-card-list.component.html',
  styleUrl: './payment-management-card-list.component.css'
})
export class PaymentManagementCardListComponent {
  @Input() paymentManagements: PaymentManagement[] = []; // Recibe una lista de PaymentManagement
}
