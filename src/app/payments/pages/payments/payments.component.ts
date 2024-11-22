import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from "../../model/payment.entity";
import { NgIf } from "@angular/common";
import { PaymentCardListComponent } from "../../components/payment-card-list/payment-card-list.component";
import { PaymentService } from "../../services/payment.service";

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    NgIf,
    PaymentCardListComponent
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  paymentManagementId!: number;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute  // Para acceder a los parámetros de la ruta
  ) {}

  ngOnInit(): void {
    // Obtener el paymentManagementId de la ruta
    this.paymentManagementId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Received paymentManagementId:', this.paymentManagementId);

    // Llamar al servicio para obtener los pagos correspondientes
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.getByPaymentManagementId(this.paymentManagementId).subscribe({
      next: (data) => {
        this.payments = data
        console.log("Data fetched:", data);  // Aquí se imprime la data en la consola
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching payments:', err)
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
