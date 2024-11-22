import {Component, inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatOption, MatSelect} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {HousesService} from "../../services/houses.service";
import { TranslateModule } from "@ngx-translate/core";
import {TranslateService} from "@ngx-translate/core";

interface Type{
  type: string;
}
interface Modal {
  modal: string;
}
interface Starts{
  starts: number;
}
interface Status{
  status: string;
}
@Component({
  selector: 'app-houses-adds',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelect,
    MatOption,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './houses-adds.component.html',
  styleUrl: './houses-adds.component.css'
})
export class HousesAddsComponent {
  private fb = inject(FormBuilder);
  private housesService = inject(HousesService);


  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('en');
  }

  houseForm: FormGroup = this.fb.group({
    userPropertyIdCtrl: ['', Validators.required],
    houseNameCtrl: ['', Validators.required],
    houseAddressCtrl: ['', Validators.required],
    houseTypeControl: ['', Validators.required],
    houseModalControl: ['', Validators.required],
    housePriceCtrl: ['', Validators.required],
    houseSizeCtrl: ['', Validators.required],
    houseDescriptionCtrl: ['', Validators.required],
    startsCalificationControl: ['', Validators.required],
    statusLandlordControl: ['', Validators.required],
    houseImageCtrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
    houseVideoCtrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
    termsConditionsCtrl: ['', Validators.required],
  });

  houseTyp: Type[] = [
    { type: 'HOUSE' },
    { type: 'APARTMENT' },
  ];
  houseMod: Modal[] = [
    { modal: 'RENTAL' },
    { modal: 'SALE' },
  ];
  startCalification: Starts[] = [
    { starts: 1 },
    { starts: 2 },
    { starts: 3 },
    { starts: 4 },
    { starts: 5 },
  ];
  statusLand: Status[] = [
    { status: 'NO_REQUEST' },
    { status: 'IN_PROGRESS' },
    { status: 'LEASED' },
  ];

  onSubmit() {
    if (this.houseForm.valid) {
      const houseData = {
        userPropertyID: this.houseForm.value.userPropertyIdCtrl,
        houseName: this.houseForm.value.houseNameCtrl,
        address: this.houseForm.value.houseAddressCtrl,
        houseType: this.houseForm.value.houseTypeControl,
        houseModal: this.houseForm.value.houseModalControl,
        price: this.houseForm.value.housePriceCtrl,
        size: this.houseForm.value.houseSizeCtrl,
        description: this.houseForm.value.houseDescriptionCtrl,
        publicationDate: new Date().toISOString(), // Formato ISO: yyyy-mm-dd
        startsCalification: this.houseForm.value.startsCalificationControl,
        statusLandlord: this.houseForm.value.statusLandlordControl,
        photo: this.houseForm.value.houseImageCtrl,
        video: this.houseForm.value.houseVideoCtrl,
        termsConditions: this.houseForm.value.termsConditionsCtrl,
      };

      console.log('Datos que se enviarán al backend:', houseData);

      this.housesService.create(houseData).subscribe(
        (response) => {
          console.log('Datos enviados correctamente:', response);
        },
        (error) => {
          console.error('Error al enviar los datos:', error);
        }
      );
    } else {
      console.log('Formulario incompleto o contiene errores');
    }
  }

  isLinear = true;
}
