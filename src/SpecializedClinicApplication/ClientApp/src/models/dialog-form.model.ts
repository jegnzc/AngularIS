export class DialogForm {

  constructor(id?: number, userName?: string, email?: string, role?: string) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.role = role;
  }

  public title?: string;
  public email?: string;
  public role?: string;
  public index?: number;
}
