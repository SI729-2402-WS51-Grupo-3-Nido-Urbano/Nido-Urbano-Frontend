import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { jsPDF } from 'jspdf';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Location, NgForOf, NgIf} from "@angular/common";
import {ContractService} from "../../services/contract.service";
import {Property, Tenant, Term} from "../../model/contract.entity";

@Component({
  selector: 'app-contract-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './contract-form.component.html',
  styleUrl: './contract-form.component.css'
})
export class ContractFormComponent implements OnInit{
  contractForm: FormGroup;
  properties: Property[] = [];
  terms: Term[] = [];  // Define 'terms' como un arreglo de 'Term'
  tenant: Tenant | null = null;
  selectedPropertyType: string | null = null; // Variable para almacenar el tipo de propiedad
  isRental: boolean = false; // Inicializa la propiedad
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private location: Location, private contractService: ContractService
  ) {
    this.contractForm = this.fb.group({
      property: ['', Validators.required],
      tenant: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      termsAgreed: [false, Validators.requiredTrue] // Agregar este control
    });
    this.loadProperties(); // Cargar propiedades desde el JSON
  }
  ngOnInit() {
    this.loadProperties();
    this.loadTenant(); // Cargar inquilinos al iniciar
    this.contractForm.get('property')?.valueChanges.subscribe((selectedProperty) => {
      this.updateDateFields(selectedProperty);
    });
  }
  loadProperties() {
    this.contractService.getProperties().subscribe((properties: Property[]) => {
      this.properties = properties;
    }, (error: any) => {
      console.error('Error loading properties:', error);
    });
  }
  loadTenant() {
    this.contractService.getTenants().subscribe((tenants: Tenant[]) => {
      if (tenants.length > 0) {
        this.tenant = tenants[0]; // Asumimos que solo hay un inquilino
        this.contractForm.patchValue({ tenant: this.tenant.name }); // Rellenar el campo inquilino
      }
    });
  }
  updateDateFields(selectedProperty: any) {
    if (selectedProperty) {
      this.selectedPropertyType = selectedProperty.house_modality; // Accede directamente a house_modality

      // Habilita o deshabilita los campos de fecha según la modalidad
      if (this.selectedPropertyType === 'rental') {
        this.contractForm.get('startDate')?.enable();
        this.contractForm.get('endDate')?.enable();
      } else {
        this.contractForm.get('startDate')?.disable();
        this.contractForm.get('endDate')?.disable();
      }
    }
  }
  propertyChange() {
    const selectedProperty = this.contractForm.get('property')?.value;
    this.isRental = selectedProperty?.house_modality === 'rental';

    if (!this.isRental) {
      this.contractForm.get('startDate')?.clearValidators();
      this.contractForm.get('endDate')?.clearValidators();
    } else {
      this.contractForm.get('startDate')?.setValidators(Validators.required);
      this.contractForm.get('endDate')?.setValidators(Validators.required);
    }

    this.contractForm.get('startDate')?.updateValueAndValidity();
    this.contractForm.get('endDate')?.updateValueAndValidity();
  }
  generateContract() {
    console.log("Estado del formulario:", this.contractForm.value);
    console.log("Generando contrato");

    if (this.contractForm.invalid) {
      console.log("Contrato invalido");
      alert('Por favor complete todos los campos');
      return;
    }

    // Obtenemos los datos del formulario
    const contractData = this.contractForm.value;
    if (this.isRental && (!contractData.startDate || !contractData.endDate)) {
      alert('Por favor complete las fechas de inicio y fin para contratos de alquiler');
      return;
    }
    if (!this.contractForm.get('termsAgreed')?.value) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    // Creamos el PDF
    const doc = new jsPDF();

    // Agregamos contenido al PDF
    doc.text('Contrato de Alquiler/Venta', 10, 10);
    doc.text(`Propiedad: ${contractData.property.name}`, 10, 20);
    doc.text(`Inquilino: ${contractData.tenant}`, 10, 30);

    // Solo agregar fechas si la propiedad es de alquiler
    if (contractData.property.house_modality === 'rental') {
      doc.text(`Fecha de inicio: ${contractData.startDate}`, 10, 40);
      doc.text(`Fecha de fin: ${contractData.endDate}`, 10, 50);
    } else {
      doc.text(`Este contrato es para la compra de la propiedad.`, 10, 40);
    }

    // Agregar término al PDF (solo uno)
    const term: Term = {
      description: 'null',  // De momento es null
      agreed: true
    };

    doc.text(`Término: ${term.description || 'Sin descripción'}, Aceptado: ${term.agreed}`, 10, 60);

    // Guardar el PDF con un nombre generado automáticamente
    doc.save(`Contrato-${contractData.property.name}.pdf`);

    // Opcional: Navegar a otra página tras la generación
    this.router.navigate(['/']);
  }

  cancelContract() {
    this.location.back(); // Regresa a la pestaña anterior
  }
}
