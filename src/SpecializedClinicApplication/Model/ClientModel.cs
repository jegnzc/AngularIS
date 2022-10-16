using SpecializedClinicApplication.Data.Models.Inventory;

namespace SpecializedClinicApplication.Model;
public class ClientModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public int PhoneNumber { get; set; }
}
