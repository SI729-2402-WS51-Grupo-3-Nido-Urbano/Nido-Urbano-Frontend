import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { jsPDF } from 'jspdf';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Location, NgClass, NgForOf, NgIf} from "@angular/common";
import {ContractService} from "../../services/contract.service";
import {Property, Tenant, Term, Landlord} from "../../model/contract.entity";

@Component({
  selector: 'app-contract-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    FormsModule,
    NgClass
  ],
  templateUrl: './contract-form.component.html',
  styleUrl: './contract-form.component.css'
})
export class ContractFormComponent implements OnInit{
  contractForm: FormGroup;
  properties: Property[] = [];
  landlords: Landlord[] = [];
  tenant: Tenant | null = null;
  selectedPropertyType: string | null = null; // Variable para almacenar el tipo de propiedad
  signatureImage: string | ArrayBuffer | null | undefined = null;
  generatedContract: boolean = false;
  contractSent: boolean = false;  // Estado de si el contrato ha sido enviado
  contractConfirmed: boolean = false;  // Estado de si el propietario ha confirmado

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
    this.loadTenant(); // Cargar inquilinos al iniciar
    this.loadLandlords(); // Cargar landlords al iniciar
    this.contractForm.get('property')?.valueChanges.subscribe((selectedProperty) => {
      this.updateDateFields(selectedProperty);
    });
  }
  loadProperties() {
    this.contractService.getProperties().subscribe((properties: Property[]) => {
      console.log(properties);
      this.properties = properties;
    }, (error: any) => {
      console.error('Error loading properties:', error);
    });
  }
  loadLandlords() {
    this.contractService.getLandlords().subscribe((landlords: Landlord[]) => {
      this.landlords = landlords;
      console.log("Landlords cargados:", this.landlords);  // Verificar en consola
    }, (error: any) => {
      console.error('Error loading landlords:', error);
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
  sendContractToLandlord() {
    alert('Contrato enviado al propietario.');  // Aquí puedes integrar la funcionalidad para enviar el contrato por correo o cualquier otro método
    this.generatedContract = false;  // Reseteamos el estado del contrato generado
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result) {
          this.signatureImage = result;  // Guardamos la imagen como base64
        }
      };
      reader.readAsDataURL(file);  // Convertir la imagen a base64
    }
  }

  // Función para convertir ArrayBuffer a base64
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
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
      console.log("Contrato inválido");
      alert('Por favor complete todos los campos');
      return;
    }

    // Obtenemos los datos del formulario
    const contractData = this.contractForm.value;
    const selectedProperty = this.properties.find(property => property.id === contractData.property.id);

    console.log('contractData:', contractData);
    console.log('selectedProperty:', selectedProperty);

    if (!selectedProperty) {
      alert('Propiedad no encontrada');
      return;
    }
    const landlordId = selectedProperty.landlord_id;
    const landlord = this.landlords.find(l => l.id === landlordId);  // Buscar el landlord por ID

    if (!landlord) {
      alert('Landlord no encontrado');
      return;
    }

    // Acceder correctamente a los términos desde selectedProperty
    const terms = (selectedProperty as any).terms;

    if (!terms || !terms.description) {
      console.error('Términos no definidos o descripción no disponible');
      alert('No se encontraron los términos de la propiedad');
      return;
    }

    // Aceptar automáticamente los términos
    terms.agreed = true;  // Marcamos el término como aceptado automáticamente

    // Crear el PDF con jsPDF
    const doc = new jsPDF();

    // Establecer la fuente y el estilo
    doc.setFont('times', 'normal');  // Fuente profesional (Times New Roman o similar)

    // Título del contrato (centrado y en negrita)
    doc.setFontSize(22);
    doc.setFont('times', 'bold');
    const contractType = selectedProperty.house_modality === 'rental' ? "Contrato de Alquiler" : "Contrato de Compra"; // Título dinámico
    doc.text(contractType, 105, 20, { align: 'center' });

    // Espaciado para el resto del contenido
    doc.setFontSize(12);
    doc.setFont('times', 'normal');
    let yPosition = 40;

    // Información de la propiedad e inquilino
    doc.text('Propiedad:', 20, yPosition);
    doc.text(selectedProperty.name, 60, yPosition);
    yPosition += 10;

    doc.text('Inquilino:', 20, yPosition);
    doc.text(contractData.tenant, 60, yPosition);
    yPosition += 10;

    // Fechas de inicio y fin solo si es alquiler
    if (contractData.property.house_modality === 'rental') {
      doc.text('Fecha de inicio:', 20, yPosition);
      doc.text(contractData.startDate, 60, yPosition);
      yPosition += 10;

      doc.text('Fecha de fin:', 20, yPosition);
      doc.text(contractData.endDate, 60, yPosition);
      yPosition += 20;
    }

    // Agregar separador
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, 190, yPosition);  // Línea horizontal
    yPosition += 10;

    // Añadir los términos al PDF (con mejor formato)
    doc.setFont('times', 'bold');
    doc.text('Términos y Condiciones:', 20, yPosition);
    doc.setFont('times', 'normal');
    doc.text(`Descripción: ${terms.description}`, 20, yPosition + 10);
    yPosition += 30;

    // Estado de los términos
    const termStatus = terms.agreed === null ? 'Pendiente de aceptación' : (terms.agreed ? 'Aceptado' : 'No Aceptado');
    doc.text(`Estado del Término: ${termStatus}`, 20, yPosition);
    yPosition += 30;

    // Firma del tenant
    if (typeof this.signatureImage === 'string') {
      doc.addImage(this.signatureImage, 'PNG', 20, yPosition, 50, 25);
      doc.text('Firma del Inquilino', 20, yPosition + 30);
      yPosition += 50;
    } else {
      doc.text('Firma pendiente', 20, yPosition + 30);
      yPosition += 20;
    }

    // Firma del landlord
    if (landlord.signature) {
      doc.addImage(landlord.signature, 'PNG', 20, yPosition, 50, 25);
      doc.text(`Firma del Propietario: ${landlord.name}`, 20, yPosition + 30);
      yPosition += 50;
    }

    // Footer con información adicional
    doc.setFont('times', 'italic');
    doc.setFontSize(10);
    doc.text('Nido Urbano - www.nidourbano.com', 105, 290, { align: 'center' });
    doc.text(`Contrato generado el: ${new Date().toLocaleDateString()}`, 105, 300, { align: 'center' });

    // Guardar el PDF con un nombre basado en la propiedad
    doc.save(`Contrato-${selectedProperty.name}.pdf`);

    // Opcional: Navegar a otra página tras la generación
    //this.router.navigate(['/']);
    this.generatedContract = true;  // Indicar que el contrato ha sido generado
    this.contractSent = true;
  }
  confirmContract() {
    this.contractConfirmed = true;
    this.contractSent = false;
    alert('Contrato confirmado por el propietario.');
  }
  cancelContract() {
    this.location.back(); // Regresa a la pestaña anterior
  }
}
