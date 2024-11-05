export class Feedback {
  id: number;
  user_name: string;
  rated_user_id: number;
  rating_user_id: number;
  score: number;
  comments: string;
  rating_date: Date;

  constructor() {
    this.id = 0;
    this.user_name = "";
    this.rated_user_id = 0;
    this.rating_user_id = 0;
    this.score = 0;
    this.comments = "";
    this.rating_date = new Date();
  }
}
