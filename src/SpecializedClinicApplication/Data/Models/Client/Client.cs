namespace SpecializedClinicApplication.Data.Models.Inventory;
public class Client
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public List<Appointment> Appointments { get; set; }

}
