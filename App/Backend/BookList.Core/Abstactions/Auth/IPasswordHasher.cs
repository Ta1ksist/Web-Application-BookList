using System.CodeDom.Compiler;

namespace BookList.Core.Abstactions.Auth;

public interface IPasswordHasher
{
    string GenerateHash(string password);
    bool Verify(string password, string passwordHash);
}