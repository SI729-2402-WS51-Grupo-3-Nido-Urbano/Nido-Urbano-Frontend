import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Payment } from "../../model/payment.entity";
import {CurrencyPipe, DatePipe, NgClass} from "@angular/common";
import { MatButtonModule } from '@angular/material/button';
import { Router } from "@angular/router";

@Component({
  selector: 'app-payment-card',
  standalone: true,
  imports: [MatCardModule, CurrencyPipe, DatePipe, MatButtonModule, NgClass],
  templateUrl: './payment-card.component.html',
  styleUrl: './payment-card.component.css'
})
export class PaymentCardComponent {
  @Input() payment!: Payment;  // Se recibe un objeto Payment

  constructor(private router: Router) {}

  viewTransactions(): void {
    console.log("Navigating to transactions for ID:", this.payment.paymentId);
    this.router.navigate([`transactions/payment/${this.payment.paymentId}`]);
  }

  getPaymentStatusClass(status: string): string {
    if (status === 'PENDING') {
      return 'payment-pending';
    } else if (status === 'COMPLETED') {
      return 'payment-completed';
    }
    return ''; // Si no es PENDING ni COMPLETED, no aplica ninguna clase
  }
}
