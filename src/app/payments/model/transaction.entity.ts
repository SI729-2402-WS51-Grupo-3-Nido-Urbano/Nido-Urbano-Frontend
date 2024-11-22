export class Transaction {
  transactionId: number;
  transactionDate: Date;
  transactionAmount: number;
  transactionStatus: string;
  paymentId: number;

  constructor(
    transactionId: number = 0,
    transactionDate: string | Date = new Date(),
    transactionAmount: number = 0,
    transactionStatus: string = 'SUCCESS',
    paymentId: number = 0
  ) {
    this.transactionId = transactionId;
    this.transactionDate = new Date(transactionDate); // Convierte string a Date si es necesario
    this.transactionAmount = transactionAmount;
    this.transactionStatus = transactionStatus;
    this.paymentId = paymentId;
  }
}
