export class PaymentManagement {
  paymentManagementId: number; // ID único de Payment Management
  contractId: number;          // ID del contrato asociado
  nextPayment: Date;           // Fecha del próximo pago
  schedule: string;            // Frecuencia del pago (e.g., MONTHLY)
  paymentStatus: string;       // Estado del pago (e.g., PENDING)
  totalAmount: number;         // Monto total
  reminderSent: boolean;       // Indica si se envió un recordatorio
  firstPayment: number;        // Primer pago realizado
  type: string;                // Tipo de pago (e.g., RENTAL)
  constructor(
    paymentManagementId: number = 0,
    contractId: number = 0,
    nextPayment: string | Date = new Date(),
    schedule: string = 'MONTHLY',
    paymentStatus: string = 'PENDING',
    totalAmount: number = 0,
    reminderSent: boolean = false,
    firstPayment: number = 0,
    type: string = 'RENTAL'
  ) {
    this.paymentManagementId = paymentManagementId;
    this.contractId = contractId;
    this.nextPayment = new Date(nextPayment); // Convierte string a Date si es necesario
    this.schedule = schedule;
    this.paymentStatus = paymentStatus;
    this.totalAmount = totalAmount;
    this.reminderSent = reminderSent;
    this.firstPayment = firstPayment;
    this.type = type;
  }
}
