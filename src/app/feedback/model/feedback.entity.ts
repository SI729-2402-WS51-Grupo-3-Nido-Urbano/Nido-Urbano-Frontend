export class Feedback {
  house_name: string;
  address: string;
  rating_id: number;
  rated_user_id: number;
  rating_user_id: number;
  score: number;
  comments: string;
  rating_date: Date;

  constructor() {
    this.house_name = "";
    this.address = "";
    this.rating_id = 0;
    this.rated_user_id = 0;
    this.rating_user_id = 0;
    this.score = 0;
    this.comments = "";
    this.rating_date = new Date();
  }
}
