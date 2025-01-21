using Microsoft.EntityFrameworkCore;
using BookList.DataAccess;
using BookList.Application.Services;
using BookList.Core.Abstactions;
using BookList.DataAccess.Mapping;
using BookList.DataAccess.Repositories;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddScoped<IBookRepository, BookRepository>();
builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
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

app.UseAuthentication();
app.UseAuthorization();
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowReactApp");
app.MapControllers();


app.Run();