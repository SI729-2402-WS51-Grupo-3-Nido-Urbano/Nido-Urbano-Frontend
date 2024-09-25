import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Contract, Property, Tenant} from "../../model/contract.entity";
import {HttpClient} from "@angular/common/http";
import {NgForOf} from "@angular/common";
@Component({
  selector: 'app-contract-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './contract-form.component.html',
  styleUrl: './contract-form.component.css'
})
export class ContractFormComponent {
  contractForm: FormGroup;
  properties: Property[] = [
    { id: 1, name: 'Property A', house_modality: 'rental', price: 800 },
    { id: 2, name: 'Property B', house_modality: 'sale', price: 120000 }
  ];
  tenants: Tenant[] = [
    { id: 1, name: 'Tenant 1' },
    { id: 2, name: 'Tenant 2' }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contractForm = this.fb.group({
      property: ['', Validators.required],
      tenant: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      terms: ['', Validators.required]
    });
  }

  generateContract() {
    if (this.contractForm.valid) {
      const contractData: Contract = {
        id: Math.floor(Math.random() * 1000), // ID aleatorio simulado
        property: this.contractForm.value.property,
        tenant: this.contractForm.value.tenant,
        startDate: this.contractForm.value.startDate,
        endDate: this.contractForm.value.endDate,
        status: 'pending',
        terms: this.contractForm.value.terms
      };

      // Simulación del guardado con db.json (http://localhost:3000/contracts)
      this.http.post('http://localhost:3000/contracts', contractData)
        .subscribe(response => {
          console.log('Contract generated:', response);
          alert('Contract generated successfully!');
        }, error => {
          console.error('Error creating contract:', error);
        });
    } else {
      alert('Please complete all required fields.');
    }
  }
}
