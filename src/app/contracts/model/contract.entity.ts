export class Contract {
  id: number;
  property: Property;
  tenant: Tenant;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'active' | 'canceled';
  terms: Term[];
  constructor(id: number, property: Property, tenant: Tenant, startDate: Date, endDate: Date, status: "pending" | "active" | "canceled", terms: Term[]) {
    this.id = id;
    this.property = property;
    this.tenant = tenant;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.terms = terms;
  }
}
export interface Term {
  id: number;
  description: string;
  agreed: boolean;
}
export interface Property {
  id: number;
  name: string;
  house_modality:'rental'| 'sale';
  price: number;
  landlord_id: number;
}
export interface Tenant {
  id: number;
  name: string;
}
