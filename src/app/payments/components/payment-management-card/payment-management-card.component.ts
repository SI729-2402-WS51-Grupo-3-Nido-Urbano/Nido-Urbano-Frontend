import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PaymentManagement } from "../../model/payment-management.entity";
import {CurrencyPipe, DatePipe, NgClass} from "@angular/common";
import { MatButtonModule } from '@angular/material/button';
import { Router } from "@angular/router";

@Component({
  selector: 'app-payment-management-card',
  standalone: true,
  imports: [MatCardModule, DatePipe, CurrencyPipe, MatButtonModule, NgClass],
  templateUrl: './payment-management-card.component.html',
  styleUrl: './payment-management-card.component.css'
})
export class PaymentManagementCardComponent {
  @Input() paymentManagement!: PaymentManagement; // Recibe un objeto PaymentManagement

  constructor(private router: Router) {}

  viewPayments(): void {
    console.log("Navigating to payments for ID:", this.paymentManagement.paymentManagementId);
    this.router.navigate([`payments/paymentManagement/${this.paymentManagement.paymentManagementId}`]);
  }

  getPaymentManagementStatusClass(status: string): string {
    if (status === 'PENDING') {
      return 'payment-management-pending';
    } else if (status === 'COMPLETED') {
      return 'payment-management-completed';
    }
    return ''; // Si no es PENDING ni COMPLETED, no aplica ninguna clase
  }

}
