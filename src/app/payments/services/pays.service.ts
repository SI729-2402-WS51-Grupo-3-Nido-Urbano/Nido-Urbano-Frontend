import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Pay } from "../model/pay.entity";
import {BaseService} from "../../shared/services/base.services";

@Injectable({
  providedIn: 'root'
})
export class PaysService extends BaseService<Pay>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/payments';
  }
}
