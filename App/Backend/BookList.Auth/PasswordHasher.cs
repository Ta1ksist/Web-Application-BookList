using BookList.Core.Abstactions.Auth;

namespace BookList.Auth;

public class PasswordHasher : IPasswordHasher
{
    public string GenerateHash(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    public bool Verify(string password, string passwordHash)
    {
        return BCrypt.Net.BCrypt.Verify(password, passwordHash);
    }
}