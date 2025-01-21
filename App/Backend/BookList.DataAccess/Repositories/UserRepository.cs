using System.ComponentModel.Design;
using System.Data;
using AutoMapper;
using BookList.Core.Abstactions;
using BookList.Core.Abstactions.Auth;
using BookList.Core.Models;
using BookList.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookList.DataAccess.Repositories;

public class UserRepository : IUserRepository
{
    
    private readonly BookContext _context;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IMapper _mapper;

    public UserRepository(BookContext context, IPasswordHasher passwordHasher, IMapper mapper)
    {
        _context = context;
        _passwordHasher = passwordHasher;
        _mapper = mapper;
    }

    public async Task<List<User>> Get()
    {
        var userEntity = await _context.Users.AsNoTracking().ToListAsync();
        var users = userEntity
            .Select(u => User.Add(u.Id, u.Name, u.LastName, u.Email, u.PasswordHash).user)
                .ToList();
        return users;
    }

    public async Task<User> GetByEmail(string email)
    {
        var userEntity = await _context.Users.AsNoTracking()
            .FirstOrDefaultAsync(u => u.Email == email)
                ?? throw new Exception();
        
        return _mapper.Map<User>(userEntity);
    }
    
    public async Task<Guid> Register(User user)
    {
        var hashePassword = _passwordHasher.GenerateHash(user.PasswordHash);
        var userEntity = new UserEntity
        {
            Id = user.Id,
            Name = user.Name,
            LastName = user.LastName,
            Email = user.Email,
            PasswordHash = hashePassword,
        };
        
        await _context.Users.AddAsync(userEntity);
        await _context.SaveChangesAsync();
        
        return userEntity.Id;
    }

    public async Task<string> Login(string email, string password)
    {
        var user = await GetByEmail(email);
        var result = _passwordHasher.Verify(password, user.PasswordHash);
        if (result == false)
        {
            throw new Exception("Wrong password");
        }
        return "Success";
    }
    
    public async Task<Guid> Update(Guid id, string name, string lastName, string email, string passwordHash)
    {
        await _context.Users.Where(s => s.Id == id)
            .ExecuteUpdateAsync(s => s
                .SetProperty(u => u.Name, name)
                .SetProperty(u => u.LastName, lastName)
                .SetProperty(u => u.Email, email)
                .SetProperty(u => u.PasswordHash, passwordHash));
        
        return id;
    }

    public async Task<Guid> Delete(Guid id)
    {
        await _context.Users.Where(s => s.Id == id)
            .ExecuteDeleteAsync();
        
        return id;
    }
}