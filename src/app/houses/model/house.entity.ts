export class House {
  house_id: number;
  user_property_id: number;
  house_name: string;
  address: string;
  house_type: string;
  house_modal: string;
  price: number;
  size: number;
  description: string;
  publication_date: string;
  starts_calification: number;
  status_landlord: string;
  photo: string;
  video: string;
  verification_id: number;
  constructor() {
    this.house_id = 0;
    this.user_property_id = 0;
    this.house_name = '';
    this.address = '';
    this.house_type = '';
    this.house_modal = '';
    this.price = 0;
    this.size = 0;
    this.description = '';
    this.publication_date = '';
    this.starts_calification = 0;
    this.status_landlord = '';
    this.photo = '';
    this.video = '';
    this.verification_id = 0;
  }
}
