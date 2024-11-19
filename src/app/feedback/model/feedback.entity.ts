export class Feedback {
  id: number;
  propertyId: number;
  userId: number;
  userName: string;
  score: number;
  comments: string;

  constructor() {
    this.id = 0;
    this.propertyId = 0;
    this.userId = 0;
    this.userName = "";
    this.score = 0;
    this.comments = ""
  }
}
