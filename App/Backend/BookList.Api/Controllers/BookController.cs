using Microsoft.AspNetCore.Mvc;
using BookList.Core.Abstactions;
using BookList.Api.Contracts;
using BookList.Core.Models;
using BookList.DataAccess;


namespace BookList.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;
        private readonly BookContext _context;

        public BookController(IBookService bookService, BookContext context)
        {
            _bookService = bookService;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<BooksResponse>>> GetBooks()
        {
            var books = await _bookService.GetBooks();
            var response = books.Select(b => new BooksResponse(b.Id, b.Title, b.Description, b.Author, b.Year));
            return Ok(response);
            // return Ok(books);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> AddBook([FromBody] BooksRequest request)
        {
            var book = new Book(
                Guid.NewGuid(),
                request.Title,
                request.Description,
                request.Author,
                request.Year);

            await _bookService.AddBook(book);
            return Ok(book);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<Guid>> UpdateBook(Guid id, [FromBody] BooksRequest request)
        {
            await _bookService.UpdateBook(id, request.Title, request.Description, request.Author, request.Year);
            return Ok();
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<Guid>> DeleteBook(Guid id)
        {
            await _bookService.DeleteBook(id);
            return Ok();
        }
    }
}
