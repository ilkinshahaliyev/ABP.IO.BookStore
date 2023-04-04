using System;
using Volo.Abp.Application.Dtos;

namespace Acme.BookStore.Books
{
    public class BookDto : AuditedEntityDto<Guid>
    {
        public string Name { get; set; }
        public BookType BookType { get; set; }
        public DateTime PublishDate { get; set; }
        public float Price { get; set; }
    }
}
