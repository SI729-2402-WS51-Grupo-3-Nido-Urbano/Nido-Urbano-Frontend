export class Payment {
  paymentId: number;
  contractId: number;
  paymentDate: Date;
  paymentAmount: number;
  remainingAmount: number;
  paymentStatus: string;
  paymentManagementId: number;

  constructor() {
    this.paymentId = 0;
    this.contractId = 0;
    this.paymentDate = new Date();
    this.paymentAmount = 0;
    this.remainingAmount = 0;
    this.paymentStatus = 'PENDING';
    this.paymentManagementId = 0;
  }
}
