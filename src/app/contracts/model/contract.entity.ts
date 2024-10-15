export class Contract {
  id: number;
  property: Property;
  tenant: Tenant;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'active' | 'canceled';
  landlord_id: number;
  terms?: Term;
  constructor(id: number, property: Property, tenant: Tenant, startDate: Date, endDate: Date,
              status: "pending" | "active" | "canceled", landlord_id: number, term: Term) {
    this.id = id;
    this.property = property;
    this.tenant = tenant;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.landlord_id = landlord_id;
    this.terms = term;
  }
}
export interface Term {
  description: string;
  agreed: boolean | null;
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
export interface Landlord {
  id: number;
  name: string;
  contact_email: string;
  signature: string;  // URL de la firma en PNG
}
