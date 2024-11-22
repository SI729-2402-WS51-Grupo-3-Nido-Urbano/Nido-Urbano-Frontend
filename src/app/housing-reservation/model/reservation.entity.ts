export class Reservation {
  id: number;
  tenantName: string;
  tenantAddress: string;
  houseName: string;
  houseAddress: string;
  houseId: number;
  startDate: Date;
  endDate: Date;
  constructor() {
    this.id = 0;
    this.tenantName = "";
    this.tenantAddress = "";
    this.houseName = "";
    this.houseAddress = "";
    this.houseId = 1;
    this.startDate = new Date();
    this.endDate = new Date();
  }
}
