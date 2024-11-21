import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Contract, Landlord, Property, Tenant} from "../model/contract.entity";
//import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiUrl = `https://my-json-server.typicode.com/AlexlmL/dbserver/contracts`;
  private propertyUrl = `https://my-json-server.typicode.com/AlexlmL/dbserver/properties`;
  /*private propertyUrl = 'http://localhost:8090/api/v1/houses'*/
  private tenantUrl = `https://my-json-server.typicode.com/AlexlmL/dbserver/tenants`;
  private landlordUrl = `https://my-json-server.typicode.com/AlexlmL/dbserver/landlords`;

  constructor(private http: HttpClient) {}
  getProperties() {
    return this.http.get<Property[]>(this.propertyUrl); // Método para obtener propiedades
  }
  getContracts() {
    return this.http.get<Contract[]>(this.apiUrl);
  }
  getTenants() {
    return this.http.get<Tenant[]>(this.tenantUrl); // Método para obtener inquilinos
  }
  getLandlords() {
    return this.http.get<Landlord[]>(this.landlordUrl);  // URL para obtener los landlords
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
