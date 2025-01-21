using BookList.Core.Abstactions;
using BookList.Core.Abstactions.Auth;
using BookList.Core.Models;

namespace BookList.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    
    public UserService(IUserRepository userRepository, IPasswordHasher passwordHasher)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
    }

    public async Task<List<User>> GetUsers()
    {
        return await _userRepository.Get();
    }

    public async Task<User> GetUserByEmail(string email)
    {
        return await _userRepository.GetByEmail(email);
    }
    
    public async Task<Guid> RegisterUser(User user)
    {
        return await _userRepository.Register(user);
    }

    public async Task<string> LoginUser(string email, string password)
    {
        return await _userRepository.Login(email, password);
    }
    
    public async Task<Guid> UpdateUser(Guid id, string name, string lastName, string email, string passwordHash)
    {
        return await _userRepository.Update(id, name, lastName, email, passwordHash);
    }

    public async Task<Guid> DeleteUser(Guid id)
    {
        return await _userRepository.Delete(id);
    }
}