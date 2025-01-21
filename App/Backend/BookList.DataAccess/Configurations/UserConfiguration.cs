using BookList.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BookList.DataAccess.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<UserEntity>
{
    public void Configure(EntityTypeBuilder<UserEntity> builder)
    {
        builder.HasKey(u => u.Id);
        
        builder.Property(u => u.Name).HasMaxLength(50).IsRequired();
        
        builder.Property(u => u.LastName).HasMaxLength(75).IsRequired();
        
        builder.Property(u => u.Email).IsRequired();
        
        builder.Property(u => u.PasswordHash).IsRequired();
    }
}