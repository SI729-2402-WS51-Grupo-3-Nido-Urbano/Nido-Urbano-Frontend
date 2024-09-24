import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Verification} from "../model/verification.entity";

@Injectable({
  providedIn: 'root'
})
export class VerificationsService extends BaseService<Verification> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/verifications';
  }
}
