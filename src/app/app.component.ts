/*import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select'; // Para usar mat-label
import { MatToolbarModule } from '@angular/material/toolbar';

import { FeedbackCreateAndEditComponent } from './feedback/components/feedback-create-and-edit/feedback-create-and-edit.component';
import { FeedbackCreateAndEditComponent } from './feedback/components/house-feedback/house-feedback.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule, // Para mat-label
    MatToolbarModule,
    FeedbackCreateAndEditComponent,
    FeedbackCreateAndEditComponent
  ],
  providers: [],
})
export class AppComponent { }*/

import { Component } from '@angular/core';
import {LanguageSwitcherComponent} from "./public/components/language-switcher/language-switcher.component";
import { RouterOutlet} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',  // El selector usado en index.html
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    LanguageSwitcherComponent,
    RouterOutlet
  ],
  // La ruta del archivo HTML del componente
  styleUrls: ['./app.component.css']  // La ruta del archivo de estilos
})
export class AppComponent {
  title = 'Feedbacks';  // Puedes cambiar el título o agregar más lógica
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');

    this.translate.use('en');
  }
}
