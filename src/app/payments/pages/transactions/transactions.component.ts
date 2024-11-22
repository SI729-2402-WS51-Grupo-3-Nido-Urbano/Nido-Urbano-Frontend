import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Transaction } from "../../model/transaction.entity";
import { NgIf } from "@angular/common";
import { TransactionCardListComponent } from "../../components/transaction-card-list/transaction-card-list.component";
import { TransactionService } from "../../services/transaction.service";
import { TransactionFormComponent } from "../../components/transaction-form/transaction-form.component";

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    NgIf,
    TransactionCardListComponent,
    TransactionFormComponent
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  paymentId!: number;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.paymentId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Received paymentId:', this.paymentId);

    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getByPaymentId(this.paymentId).subscribe({
      next: (data) => {
        this.transactions = data;
        console.log("Data fetched:", data);  // Aquí se imprime la data en la consola
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching payments:', err);
        this.isLoading = false;
        console.error(err);
      }
    })
  }

  createTransaction(transaction: { transactionAmount: number; paymentId: number }) {
    this.transactionService.create(transaction).subscribe({
      next: (data) => {
        this.transactions.push(data);
        console.log("Data fetched:", data);
        this.showSnackBar('Transaction created successfully!', 'success');
      },
      error: (err) => {
        const errorMessage = this.getErrorMessage(err);
        this.showSnackBar(errorMessage, 'error');
      }
    })
  }

  showSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: type === 'success' ? 'snack-bar-success' : 'snack-bar-error',
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  getErrorMessage(err: any): string {
    if (err.status === 400) {
      return 'Invalid request. Please check the transaction details.';
    } else if (err.status === 404) {
      return 'Payment ID not found. Please refresh the page.';
    } else {
      return 'An unexpected error occurred. Please try again.';
    }
  }
}
