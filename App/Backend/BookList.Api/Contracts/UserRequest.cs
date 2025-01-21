namespace BookList.Api.Contracts;

public record UserRequest(
    string Name,
    string LastName,
    string Email,
    string PasswordHash
    );