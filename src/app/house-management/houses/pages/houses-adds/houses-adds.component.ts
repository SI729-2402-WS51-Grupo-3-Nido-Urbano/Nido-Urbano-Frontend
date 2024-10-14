import {Component, inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatOption, MatSelect} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {HousesService} from "../../services/houses.service";

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
  ],
  templateUrl: './houses-adds.component.html',
  styleUrl: './houses-adds.component.css'
})
export class HousesAddsComponent {
  private _formBuilder = inject(FormBuilder);
  private housesService = inject(HousesService);
  houseTypeControl = new FormControl<Type | null>(null, Validators.required);
  houseModalControl = new FormControl<Modal | null>(null, Validators.required);
  startsCalificationControl = new FormControl<Starts | null>(null, Validators.required);
  statusLandlordControl = new FormControl<Status | null>(null, Validators.required);

  houseTyp: Type[] = [
    {type: 'HOUSE'},
    {type: 'APARTMENT'},
  ];
  houseMod: Modal[] = [
    {modal: 'RENTAL'},
    {modal: 'SALE'},
  ];
  startCalification: Starts[] = [
    {starts: 1},
    {starts: 2},
    {starts: 3},
    {starts: 4},
    {starts: 5},
  ];
  statusLand: Status[] = [
    {status: 'NO REQUEST'},
    {status: 'IN PROGRESS'},
    {status: 'LEASED'},
  ];

  userPropertyId = this._formBuilder.group({
    userPropertyIdCtrl: ['', Validators.required]
  });
  houseName = this._formBuilder.group({
    houseNameCtrl: ['', Validators.required]
  });
  houseAddress = this._formBuilder.group({
    houseAddressCtrl: ['', Validators.required]
  });
  houseType = this._formBuilder.group({
    houseTypeControl: ['', Validators.required]
  });
  houseModal = this._formBuilder.group({
    houseModalControl: ['', Validators.required]
  });
  housePrice = this._formBuilder.group({
    housePriceCtrl: ['', Validators.required]
  });
  houseSize = this._formBuilder.group({
    houseSizeCtrl: ['', Validators.required]
  });
  houseDescription = this._formBuilder.group({
    houseDescriptionCtrl: ['', Validators.required]
  });
  startsCalification = this._formBuilder.group({
    startsCalificationControl: ['', Validators.required]
  });
  statusLandlord = this._formBuilder.group({
    statusLandlordControl: ['', Validators.required]
  });
  houseImage = this._formBuilder.group({
    houseImageCtrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
  });
  houseVideo = this._formBuilder.group({
    houseVideoCtrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
  });
  verificationId = this._formBuilder.group({
    verificationIdCtrl: ['', Validators.required]
  });
  houseForm: FormGroup = this._formBuilder.group({
    userPropertyIdCtrl: this.userPropertyId.get('userPropertyIdCtrl'),
    houseNameCtrl: this.houseName.get('houseNameCtrl'),
    houseAddressCtrl: this.houseAddress.get('houseAddressCtrl'),
    houseTypeControl: this.houseType.get('houseTypeControl'),
    houseModalControl: this.houseModal.get('houseModalControl'),
    housePriceCtrl: this.housePrice.get('housePriceCtrl'),
    houseSizeCtrl: this.houseSize.get('houseSizeCtrl'),
    houseDescriptionCtrl: this.houseDescription.get('houseDescriptionCtrl'),
    startsCalificationControl: this.startsCalification.get('startsCalificationControl'),
    statusLandlordControl: this.statusLandlord.get('statusLandlordControl'),
    houseImageCtrl: this.houseImage.get('houseImageCtrl'),
    houseVideoCtrl: this.houseVideo.get('houseVideoCtrl'),
    verificationIdCtrl: this.verificationId.get('verificationIdCtrl')
  });


  onSubmit() {
    if (this.houseForm.valid) {
      const houseData = {
        user_property_id: this.houseForm.value.userPropertyIdCtrl,
        house_name: this.houseForm.value.houseNameCtrl,
        address: this.houseForm.value.houseAddressCtrl,
        house_type: this.houseForm.value.houseTypeControl,
        house_modal: this.houseForm.value.houseModalControl,
        price: this.houseForm.value.housePriceCtrl,
        size: this.houseForm.value.houseSizeCtrl,
        description: this.houseForm.value.houseDescriptionCtrl,
        publication_date: new Date().toLocaleDateString('en-CA'), // Formato ISO: yyyy-mm-dd
        starts_calification: this.houseForm.value.startsCalificationControl,
        status_landlord: this.houseForm.value.statusLandlordControl,
        photo: this.houseForm.value.houseImageCtrl,
        video: this.houseForm.value.houseVideoCtrl,
        verification_id: this.houseForm.value.verificationIdCtrl
      };

      console.log(houseData);

      this.housesService.create(houseData)
        .subscribe(
          response => {
            console.log("Datos enviados correctamente:", response);
          },
          error => {
            console.error("Error al enviar los datos:", error);
          }
        );
    } else {
      console.log('Formulario incompleto o contiene errores');
    }

  }
  isLinear = false;
}
