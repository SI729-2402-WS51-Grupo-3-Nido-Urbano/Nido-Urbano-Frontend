import { Component, Input } from '@angular/core';
import { Transaction } from "../../model/transaction.entity";
import { MatCardModule } from '@angular/material/card';
import {DatePipe, NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [MatCardModule, NgIf, DatePipe, NgClass],
  templateUrl: './transaction-card.component.html',
  styleUrl: './transaction-card.component.css'
})
export class TransactionCardComponent {
  @Input() transaction: Transaction | undefined;  // Recibe un objeto Transaction
}
