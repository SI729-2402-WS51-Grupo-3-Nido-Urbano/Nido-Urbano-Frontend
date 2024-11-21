export class House {
  id: number;
  userPropertyId: number;
  houseName: string;
  address: string;
  houseType: string;
  houseModal: string;
  price: number;
  size: number;
  description: string;
  publication_date: string;
  startsCalification: number;
  statusLandlord: string;
  photo: string;
  video: string;
  termsConditions: string;
  constructor() {
    this.id = 0;
    this.userPropertyId = 0;
    this.houseName = '';
    this.address = '';
    this.houseType = '';
    this.houseModal = '';
    this.price = 0;
    this.size = 0;
    this.description = '';
    this.publication_date = '';
    this.startsCalification = 0;
    this.statusLandlord = '';
    this.photo = '';
    this.video = '';
    this.termsConditions = '';
  }
}
