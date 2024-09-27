export class House {
  amount: number;
  ownerId: number;
  size: string;
  spaces: string;
  nearest: string;
  description: string;
  type: string

  constructor() {
    this.amount = 0;
    this.ownerId = 0;
    this.size = "";
    this.spaces = "";
    this.nearest = "";
    this.description = "";
    this.type = "";
  }
}
