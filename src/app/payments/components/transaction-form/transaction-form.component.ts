import {Component, EventEmitter, Input, Output} from '@angular/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatInput } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInput, MatButtonModule, NgIf],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent {


  @Input() paymentId!: number;
  @Output() transactionCreated = new EventEmitter<
    { transactionAmount: number;
      paymentId: number
    }>();  // Emitir el objeto Transaction al componente padre

  transactionAmount: number = 0;

  onSubmit(): void {
    if (this.transactionAmount > 0) {  // Verificar que el monto sea mayor a 0
      const transactionToSend = {
        transactionAmount: this.transactionAmount,
        paymentId: this.paymentId
      };
      this.transactionCreated.emit(transactionToSend);  // Emitir el objeto Transaction al componente principal
      console.log(transactionToSend)
      this.resetForm();  // Limpiar el formulario después de enviar
    }
  }

  // Método para limpiar el formulario
  resetForm(): void {
    this.transactionAmount = 0;
  }
}
