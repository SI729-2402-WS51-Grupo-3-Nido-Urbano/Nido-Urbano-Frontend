import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderContentComponent } from './public/components/header-content/header-content.component';
import { FooterContentComponent } from './public/components/footer-content/footer-content.component';
import { TranslateService } from "@ngx-translate/core";
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from "@angular/material/sidenav";
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatListItem, MatNavList } from "@angular/material/list";
import { MatIcon } from "@angular/material/icon";
import { LanguageSwitcherComponent } from "./public/components/language-switcher/language-switcher.component";
import { MatToolbar } from "@angular/material/toolbar";
import { HousesManagementsComponent } from "./house-management/houses/pages/houses-managements/houses-managements.component";
import {HousesAddComponent} from "./house-management/houses/components/houses-add/houses-add.component";
import {HousesAddsComponent} from "./house-management/houses/components/houses-adds/houses-adds.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, HeaderContentComponent,
    FooterContentComponent, MatListItem,
    MatIcon, MatNavList,
    MatSidenav, MatSidenavContainer,
    LanguageSwitcherComponent, RouterLink,
    MatToolbar, MatSidenavModule,
    HousesManagementsComponent, HousesAddComponent, HousesAddsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'nido-urbano-frontend';

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  options = [
    { icon: 'home', path: '/home', title: 'Home' },
    { icon: 'house', path: '/houses', title: 'Houses' },
    { icon: 'info', path: '/about', title: 'About' }
  ];

  constructor(private translate: TranslateService, private observer: BreakpointObserver) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 1280px)'])
      .subscribe((response) => {
        if (this.sidenav) {
          if (response.matches) {
            this.sidenav.mode = 'over';
            this.sidenav.close();
          } else {
            this.sidenav.mode = 'side';
            this.sidenav.open();
          }
        }
      });
  }
}
