using BookList.DataAccess.Entities;
using BookList.Core.Models;
using AutoMapper;

namespace BookList.DataAccess.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<UserEntity, User>();
    }
}