using BookList.Core.Models;


namespace BookList.Core.Abstactions;

public interface IBookRepository
{
    Task<List<Book>> Get();
    
    Task<Guid> Add(Book book);
    
    Task<Guid> Update(Guid id, string title, string description, string author, int year);
    
    Task<Guid> Delete(Guid id);
}