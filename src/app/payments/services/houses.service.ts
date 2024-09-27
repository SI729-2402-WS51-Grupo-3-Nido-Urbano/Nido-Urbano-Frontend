import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { House } from "../model/house.entity";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HousesService extends BaseService<House>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/houses';
  }


  private selectedHouse: House | null = null;

  setHouse(house: House): void {
    this.selectedHouse = house;
  }

  getHouse(): House | null {
    return this.selectedHouse;
  }

  clearHouse(): void {
    this.selectedHouse = null;
  }
}
