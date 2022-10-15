namespace SpecializedClinicApplication.Data.Models.Inventory;
public class Appointment
{
    public int Id { get; set; }
    public string Reason { get; set; }
    public int ClientId { get; set; }
    public Client Client { get; set; }
    public DateTime Date { get; set; }

}
