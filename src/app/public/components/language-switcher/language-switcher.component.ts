import { Component } from '@angular/core';

import { TranslateService } from "@ngx-translate/core";
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [MatButtonToggleModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
  currentLang: string = 'en';
  languages: string[] = ['en', 'es'];

  constructor(private translate: TranslateService) {
    this.currentLang = translate.currentLang || 'en';
  }

  useLanguage(language: string) : void {
    this.translate.use(language);
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLang = lang;  // Actualizar el valor actual
  }
}
