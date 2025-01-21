using BookList.Core.Abstactions;
using Microsoft.AspNetCore.Mvc;
using BookList.Api.Contracts;
using BookList.Core.Models;

namespace BookList.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : Controller
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<ActionResult<List<UsersResponse>>> GetUsers()
    {
        var users = await _userService.GetUsers();
        var response = users.Select(u => new UsersResponse(u.Id, u.Name, u.LastName,
            u.Email, u.PasswordHash));
        
        return Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> RegisterUser([FromBody] UserRequest request)
    {
        var user = new User(
            Guid.NewGuid(),
            request.Name,
            request.LastName,
            request.Email,
            request.PasswordHash
            );
        
        await _userService.RegisterUser(user);
        return Ok(user);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<Guid>> UpdateUser(Guid id, [FromBody] UserRequest request)
    {
        await _userService.UpdateUser(id, request.Name, request.LastName, request.Email, request.PasswordHash);
        return Ok();
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<Guid>> DeleteUser(Guid id)
    {
        await _userService.DeleteUser(id);
        return Ok();
    }
}