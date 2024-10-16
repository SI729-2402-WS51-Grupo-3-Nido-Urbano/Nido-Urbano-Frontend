import {Component, EventEmitter, Input, Output} from '@angular/core';
import {House} from "../../model/house.entity";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
@Component({
  selector: 'app-house-edit',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    FormsModule,
    NgIf,
    MatButton,
    MatFormFieldModule
  ],
  templateUrl: './house-edit.component.html',
  styleUrl: './house-edit.component.css'
})
export class HouseEditComponent {

  @Input() house: House | null = null;
  @Output() save = new EventEmitter<House>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    if (this.house) {
      this.save.emit(this.house);
    }
  }
  onCancel() {
    this.cancel.emit();
  }


}
