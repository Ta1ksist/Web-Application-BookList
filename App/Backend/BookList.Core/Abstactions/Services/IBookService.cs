using BookList.Core.Models;

namespace BookList.Core.Abstactions;

public interface IBookService
{
    Task<List<Book>> GetBooks();

    Task<Guid> AddBook(Book book);

    Task<Guid> UpdateBook(Guid id, string title, string description, string author, int year);

    Task<Guid> DeleteBook(Guid id);
}