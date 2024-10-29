export class Pay {
  paymentId: number;
  buyerName: String;
  documentType: String;
  identificationNumber: String;
  phoneNumber: String;
  email: String;
  bank: String;
  amountSale: number;
  houseId: number;

  constructor() {
    this.paymentId = 0;
    this.buyerName = "";
    this.documentType = "";
    this.identificationNumber = "";
    this.phoneNumber = "";
    this.email = "";
    this.bank = "";
    this.amountSale = 0;
    this.houseId = 0;
  }
}
