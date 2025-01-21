using BookList.DataAccess.Configurations;
using Microsoft.EntityFrameworkCore;
using BookList.DataAccess.Entities;


namespace BookList.DataAccess;

public class BookContext : DbContext
{
    public BookContext(DbContextOptions options)
        : base(options)
    {
    }    

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new BookConfiguration());
        modelBuilder.ApplyConfiguration(new UserConfiguration());
    }
    
    public DbSet<BookEntity> Books { get; set; }
    public DbSet<UserEntity> Users { get; set;  }
}