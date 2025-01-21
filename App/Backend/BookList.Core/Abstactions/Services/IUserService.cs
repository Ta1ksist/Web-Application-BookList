using BookList.Core.Models;

namespace BookList.Core.Abstactions;

public interface IUserService
{
    Task<List<User>> GetUsers();
    Task<User> GetUserByEmail(string email);
    Task<Guid> RegisterUser(User user);
    Task<string> LoginUser(string email, string password);
    Task<Guid> UpdateUser(Guid id, string name, string lastName, string email, string passwordHash);
    Task<Guid> DeleteUser(Guid id);
}