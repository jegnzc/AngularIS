export class Appointment {

  constructor(id?: number, reason?: string, clientId?: number, serviceId?: number, date?: Date) {
    this.id = id;
    this.reason = reason;
    this.clientId = clientId;
    this.serviceId = serviceId;
    this.date = date;
  }

  public id?: number;
  public reason?: string;
  public clientId?: number;
  public serviceId?: number;
  public date?: Date;
  public index?: number;
}
