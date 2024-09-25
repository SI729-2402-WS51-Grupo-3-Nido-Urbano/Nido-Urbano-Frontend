import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Contract} from "../model/contract.entity";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiUrl = '/api/contracts';

  constructor(private http: HttpClient) {}

  getContracts() {
    return this.http.get<Contract[]>(this.apiUrl);
  }

  createContract(contractData: Contract) {
    return this.http.post(this.apiUrl, contractData);
  }

  updateContract(id: number, contractData: Contract) {
    return this.http.put(`${this.apiUrl}/${id}`, contractData);
  }

  cancelContract(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
