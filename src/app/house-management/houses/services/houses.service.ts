import { Injectable } from '@angular/core';
import { BaseService } from "../../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { House} from "../model/house.entity";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HousesService extends BaseService<House>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/houses';
  }
  private selectedHouse: House | undefined;
  setSelectedHouse(house: House): void {
    this.selectedHouse = house;
  }
  getSelectedHouse(): House{
    return <House>this.selectedHouse;
  }
  /*Filtra House por House_Modal*/
  getHouseByHouseModal(house_modal: "SALE" | "RENTAL") {
    return this.http.get<House[]>(`${this.basePath}${this.resourceEndpoint}?house_modal=${house_modal}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
