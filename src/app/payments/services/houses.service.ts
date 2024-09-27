import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { House } from "../model/house.entity";

@Injectable({
  providedIn: 'root'
})
export class HousesService extends BaseService<House>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/houses';
  }

  private selectedHouse: House | undefined;

  setHouse(house: House): void {
      this.selectedHouse = house;
  }

  getHouse(): House {
    return <House>this.selectedHouse;
  }
}
