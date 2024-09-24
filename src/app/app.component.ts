import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderContentComponent } from './public/components/header-content/header-content.component';
import { FooterContentComponent } from './public/components/footer-content/footer-content.component';
//import { ProductListComponent } from "./products/components/product-list/product-list.component";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderContentComponent, FooterContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'nido-urbano-frontend';
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
