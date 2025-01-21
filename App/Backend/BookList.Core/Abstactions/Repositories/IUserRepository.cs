using BookList.Core.Models;

namespace BookList.Core.Abstactions;

public interface IUserRepository
{
    Task<List<User>> Get();
    Task<User> GetByEmail(string email);
    Task<Guid> Register(User user);
    Task<string> Login(string email, string password);
    Task<Guid> Update(Guid id, string name, string lastName, string email, string passwordHash);
    Task<Guid> Delete(Guid id);
}