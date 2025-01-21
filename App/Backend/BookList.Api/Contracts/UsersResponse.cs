namespace BookList.Api.Contracts;

public record UsersResponse(
    Guid Id,
    string Name,
    string LastName,
    string Email,
    string PasswordHash
    );