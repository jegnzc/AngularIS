export class User {

  constructor(id?: string, userName?: string, email?: string, roles?: string) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.roles = roles;
  }

  public id?: string;
  public userName?: string;
  public email?: string;
  public roles?: string;
}

export class UpdateUser {
  constructor(userId?: string, role?: string, email?: string, userName?: string) {
    this.userId = userId;
    this.userName = userName;
    this.email = email;
    this.role = role;
  }
  public userId?: string;
  public role?: string;
  public email?: string;
  public userName?: string;
}

