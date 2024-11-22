import { Component, OnInit  } from '@angular/core';
import { PaymentManagement } from "../../model/payment-management.entity";
import { PaymentManagementCardListComponent } from "../../components/payment-management-card-list/payment-management-card-list.component";
import { PaymentManagementService } from "../../services/payment-management.service";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-payment-managements',
  standalone: true,
  imports: [
    PaymentManagementCardListComponent,
    NgIf
  ],
  templateUrl: './payment-managements.component.html',
  styleUrl: './payment-managements.component.css'
})
export class PaymentManagementsComponent implements OnInit {
  paymentManagements: PaymentManagement[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private paymentManagementService: PaymentManagementService) {}

  ngOnInit(): void {
    this.fetchPaymentManagements();
  }

  fetchPaymentManagements(): void {
    this.paymentManagementService.getAll().subscribe({
      next: (data) => {
        this.paymentManagements = data;
        console.log("Data fetched:", data);  // Aquí se imprime la data en la consola
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load payment managements';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
