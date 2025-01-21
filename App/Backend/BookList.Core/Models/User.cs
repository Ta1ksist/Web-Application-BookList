namespace BookList.Core.Models;

public class User
{
    const int MaxNameLength = 50;
    const int MaxLastNameLength = 75;
    
    public Guid Id { get; }
    public string Name { get; private set; }
    public string LastName { get; private set; }
    public string Email { get; private set; }
    public string PasswordHash { get; private set; }

    public User(Guid id, string name, string lastName, string email, string passwordHash)
    {
        Id = id;
        Name = name;
        LastName = lastName;
        Email = email;
        PasswordHash = passwordHash;
    }

    public static (User user, string Error) Add(Guid id, string name, string lastName, string email, string passwordHash)
    {
        var error = string.Empty;

        if (string.IsNullOrEmpty(name) || name.Length > MaxNameLength)
        {
            error = $"Name is required or length is greater than {MaxNameLength} characters.";
        }

        if (string.IsNullOrEmpty(lastName) || lastName.Length > MaxLastNameLength)
        {
            error = $"Last name is required or length is greater than {MaxLastNameLength} characters.";
        }

        if (string.IsNullOrEmpty(email))
        {
            error = "Email is required";
        }

        if (passwordHash == null)
        {
            error = "Password is required";
        }
        
        var user = new User(id, name, lastName, email, passwordHash);
        
        return (user, error);
    }
}