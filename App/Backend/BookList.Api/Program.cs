using Microsoft.EntityFrameworkCore;
using BookList.DataAccess;
using BookList.Application.Services;
using BookList.Core.Abstactions;
using BookList.DataAccess.Repositories;
using SecurityHeadersMiddleware;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddScoped<IBookRepository, BookRepository>();
builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddDbContext<BookContext>(options =>
    options.UseNpgsql("Host=localhost;Port=5434;Database=BooksDb;Username=postgres;Password=postgres"));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",builder => 
        builder.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowReactApp");
app.MapControllers();


app.Run();