import { Component } from '@angular/core';
import {LanguageSwitcherComponent} from "./public/components/language-switcher/language-switcher.component";
import { RouterOutlet} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    LanguageSwitcherComponent,
    RouterOutlet
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Feedbacks';
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');

    this.translate.use('en');
  }
}
