export class Product {

  constructor(id?: number, name?: string, price?: number, quantity?: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  public id?: number;
  public name?: string;
  public price?: number;
  public quantity?: number;
  public index?: number;
}
