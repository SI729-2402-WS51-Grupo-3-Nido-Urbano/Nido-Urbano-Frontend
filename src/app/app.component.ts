import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { BreakpointObserver } from "@angular/cdk/layout";
import { TranslateService } from "@ngx-translate/core";
import { LanguageSwitcherComponent } from "./public/components/language-switcher/language-switcher.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    LanguageSwitcherComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Corregido: styleUrls en lugar de styleUrl
})
export class AppComponent implements OnInit {
  title = 'housing-reservation';

  @ViewChild(MatSidenav, { static: true }) sidenav!: MatSidenav;

  options = [
    { icon: 'explore', path: '/housing-reservation/reservations', title: 'Appointments' },
    { icon: 'event', path: '/housing-reservation/calendar', title: 'Dates' }
  ];

  constructor(private translate: TranslateService, private observer: BreakpointObserver) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.observer.observe(['(min-width: 280px)']).subscribe(response => {
      if (response.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
}
