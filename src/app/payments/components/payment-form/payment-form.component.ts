import { Component, OnInit  } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField} from "@angular/material/form-field";
import {NgForOf, NgIf} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatLabel} from "@angular/material/form-field";
import {MatError} from "@angular/material/form-field";

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    NgIf,
    MatSelect,
    MatOption,
    NgForOf,
    MatInput,
    MatButton,
    MatLabel,
    MatError
  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent implements OnInit {
  paymentForm: FormGroup;

  // Opciones para el tipo de documentación
  documentTypes = [
    { value: 'dni', viewValue: 'DNI' },
    { value: 'passport', viewValue: 'Pasaporte' },
    { value: 'license', viewValue: 'Licencia de Conducir' }
  ];

  // Opciones para el banco
  banks = [
    { value: 'bcp', viewValue: 'Banco de Crédito del Perú (BCP)' },
  ];

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      documentType: ['', Validators.required], // Tipo de Documentación
      documentNumber: ['', [Validators.required, Validators.pattern('^[0-8]+$')]], // Número de Identificación
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]], // Número de Teléfono
      email: ['', [Validators.required, Validators.email]], // Correo Electrónico
      bank: ['', Validators.required] // Selección de Banco
    });
  }

  ngOnInit(): void {}

  // Metodo para manejar el envío del formulario
  onSubmit(): void {
    if (this.paymentForm.valid) {
      console.log('Formulario válido:', this.paymentForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
