import { Component, OnInit  } from '@angular/core';
import { PaysService } from '../../services/pays.service';
import { Pay } from '../../model/pay.entity';
import {MatCard, MatCardContent} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    NgIf
  ],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css'
})
export class PaymentListComponent implements OnInit{
  payments: Pay[] = []; // Array para almacenar los pagos

  constructor(private paysService: PaysService) { }

  ngOnInit(): void {

  }

  private loadPayments(): void {

  }
}
