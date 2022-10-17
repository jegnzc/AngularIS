using SpecializedClinicApplication.Model;

namespace SpecializedClinicApplication.Data.Models.Inventory;
public class AppointmentModel
{
    public int Id { get; set; }
    public string? Reason { get; set; }
    public int ClientId { get; set; }
    public ClientModel? Client { get; set; }
    public int ServiceId { get; set; }
    public ServiceModel? Service { get; set; }
    public DateTime Date { get; set; }
}
