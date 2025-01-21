using BookList.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using BookList.Core.Models;
using BookList.Core.Abstactions;


namespace BookList.DataAccess.Repositories;

public class BookRepository : IBookRepository
{
    private readonly BookContext _context;

    public BookRepository(BookContext context)
    {
        _context = context;
    }

    public async Task<List<Book>> Get()
    {
        var bookEntities = await _context.Books.AsNoTracking().ToListAsync();
        var books = bookEntities
            .Select(b => Book.Add(b.Id, b.Title, b.Description, b.Author, b.Year).book)
                .ToList();

        return books;
    }

    public async Task<Guid> Add(Book book)
    {
        var bookEntity = new BookEntity
        {
            Id = book.Id,
            Title = book.Title,
            Description = book.Description,
            Author = book.Author,
            Year = book.Year
        };

        await _context.Books.AddAsync(bookEntity);
        await _context.SaveChangesAsync();

        return bookEntity.Id;
    }

    public async Task<Guid> Update(Guid id, string title, string description, string author, int year)
    {
        await _context.Books.Where(s => s.Id == id)
            .ExecuteUpdateAsync(s => s
                .SetProperty(b => b.Title, title)
                .SetProperty(b => b.Description, description)
                .SetProperty(b => b.Author, author)
                .SetProperty(b => b.Year, year));

        return id;
    }

    public async Task<Guid> Delete(Guid id)
    {
        await _context.Books.Where(s => s.Id == id)
            .ExecuteDeleteAsync();

        return id;
    }
}