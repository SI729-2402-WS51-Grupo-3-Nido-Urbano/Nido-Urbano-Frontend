export class Reservation {
  id: number;
  tenant_name: string;
  age: number;
  tenant_address: string;
  house_name: string;
  house_address: string;
  landlord_name: string;
  start_date: Date;
  end_date: Date;
  constructor() {
    this.id = 0;
    this.tenant_name = "";
    this.age = 0;
    this.tenant_address = "";
    this.house_name = "";
    this.house_address = "";
    this.landlord_name = "";
    this.start_date = new Date();
    this.end_date = new Date();
  }
}
