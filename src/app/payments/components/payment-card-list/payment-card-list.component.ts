import { Component, Input } from '@angular/core';
import { PaymentCardComponent } from "../payment-card/payment-card.component";
import { NgForOf } from "@angular/common";
import { Payment } from "../../model/payment.entity";

@Component({
  selector: 'app-payment-card-list',
  standalone: true,
  imports: [
    PaymentCardComponent,
    NgForOf
  ],
  templateUrl: './payment-card-list.component.html',
  styleUrl: './payment-card-list.component.css'
})
export class PaymentCardListComponent {
  @Input() payments: Payment[] = [];
}
