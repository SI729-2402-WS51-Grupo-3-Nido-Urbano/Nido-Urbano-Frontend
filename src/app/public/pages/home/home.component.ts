import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {HouseCardComponent} from "../../components/house-card/house-card.component";
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf, HouseCardComponent, MatTabsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  houses = [
    { price: '$300 000 Dolares', image: 'https://i.postimg.cc/3NyhYt06/image.png' },
    { price: '$250 000 Dolares', image: 'https://i.postimg.cc/3NyhYt06/image.png' },
    { price: '$400 000 Dolares', image: 'https://i.postimg.cc/3NyhYt06/image.png' },
    { price: '$55 000 Dolares', image: 'https://i.postimg.cc/3NyhYt06/image.png' },
    { price: '$250 000 Dolares', image: 'https://i.postimg.cc/3NyhYt06/image.png' },
    { price: '$270 000 Dolares', image: 'https://i.postimg.cc/3NyhYt06/image.png' },
    { price: '$320 000 Dolares', image: 'https://i.postimg.cc/3NyhYt06/image.png' },
    { price: '$650 000 Dolares', image: 'https://i.postimg.cc/3NyhYt06/image.png' }
  ];


}
