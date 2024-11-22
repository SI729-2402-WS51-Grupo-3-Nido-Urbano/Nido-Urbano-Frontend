import { Component, Input } from '@angular/core';
import { TransactionCardComponent } from "../transaction-card/transaction-card.component";
import { NgForOf } from "@angular/common";
import { Transaction } from "../../model/transaction.entity";

@Component({
  selector: 'app-transaction-card-list',
  standalone: true,
  imports: [
    TransactionCardComponent,
    NgForOf
  ],
  templateUrl: './transaction-card-list.component.html',
  styleUrl: './transaction-card-list.component.css'
})
export class TransactionCardListComponent {
  @Input() transactions: Transaction[] = [];
}
