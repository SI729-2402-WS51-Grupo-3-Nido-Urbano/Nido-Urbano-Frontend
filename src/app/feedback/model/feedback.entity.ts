export class Feedback {
  id: number;
  property_id: number;
  user_id: number;
  score: number;
  comments: string;
  rating_date: Date;

  constructor() {
    this.id = 0;
    this.property_id = 0;
    this.user_id = 0;
    this.score = 0;
    this.comments = "";
    this.rating_date = new Date();
  }
}
