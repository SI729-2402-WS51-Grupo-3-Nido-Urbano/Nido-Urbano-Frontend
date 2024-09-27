import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Pay } from "../model/pay.entity";

@Injectable({
  providedIn: 'root'
})
export class PaysService extends BaseService<Pay>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/payments';
  }
}
