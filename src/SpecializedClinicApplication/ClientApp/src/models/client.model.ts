export class Client {

  constructor(id?: number, name?: string, address?: string, email?: string, phoneNumber?: string) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }

  public id?: number;
  public name?: string;
  public address?: string;
  public email?: string;  
  public phoneNumber?: string;
  public index?: number;
}
