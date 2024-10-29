import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {ContractFormComponent} from "../../components/contract-form/contract-form.component";

@Component({
  selector: 'app-contract-form-page',
  standalone: true,
  imports: [
    ContractFormComponent
  ],
  templateUrl: './contract-form-page.component.html',
  styleUrl: './contract-form-page.component.css'
})
export class ContractFormPageComponent {
  constructor() {}

}
