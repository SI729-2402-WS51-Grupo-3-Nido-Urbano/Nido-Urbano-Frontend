export class House {
  amount: number;
  ownerId: number;
  size: String;
  spaces: number;
  nearest: String;
  description: String;
  type: String
  imageUrl: String;

  constructor() {
    this.amount = 0;
    this.ownerId = 0;
    this.size = "";
    this.spaces = 0;
    this.nearest = "";
    this.description = "";
    this.type = "";
    this.imageUrl = "";
  }
}
