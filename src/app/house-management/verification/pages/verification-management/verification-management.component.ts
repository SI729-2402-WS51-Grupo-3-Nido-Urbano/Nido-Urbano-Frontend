import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-verification-management',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule],
  templateUrl: './verification-management.component.html',
  styleUrl: './verification-management.component.css'
})
export class VerificationManagementComponent {

}
