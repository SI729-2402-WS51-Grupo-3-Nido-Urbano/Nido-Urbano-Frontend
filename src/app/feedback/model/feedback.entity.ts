export class Feedback {
  id: number;
  property_id: number;
  user_id: number;
  user_name: string;
  score: number;
  comments: string;

  constructor() {
    this.id = 0;
    this.property_id = 0;
    this.user_id = 0;
    this.user_name = "";
    this.score = 0;
    this.comments = ""
  }
}
