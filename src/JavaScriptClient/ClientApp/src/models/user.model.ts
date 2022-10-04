// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

export class User {
  // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
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
