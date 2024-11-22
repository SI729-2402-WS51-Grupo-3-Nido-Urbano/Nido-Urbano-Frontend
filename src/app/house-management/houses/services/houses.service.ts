import { Injectable } from '@angular/core';
import { BaseService } from "../../../shared/services/base.services";
import { HttpClient } from "@angular/common/http";
import { House} from "../model/house.entity";
import {catchError, Observable, retry} from "rxjs";

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

  setHouse(house: House): void {
    this.selectedHouse = house;
  }
  getSelectedHouse(): House{
    return <House>this.selectedHouse;
  }
  /*Filtra House por House_Modal*/
  getHouseByHouseModal(housemodal: string): Observable<House[]> {
    const url = `${this.basePath}${this.resourceEndpoint}/houseModal/${housemodal}`;
    console.log('Request URL:', url); // Depuración
    return this.http.get<House[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  // Get All Resources for userPropertyId
  getAllHouseByUserId(user_property_id: number): Observable<any> {
    return this.http.get<any>(`${this.basePath}${this.resourceEndpoint}/userPropertyID/${user_property_id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getHouse(): House {
    return <House>this.selectedHouse;
  }

  getSelectedHouseId(): number | undefined {
    return this.selectedHouse?.id;
  }

}
