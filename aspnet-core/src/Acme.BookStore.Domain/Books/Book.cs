using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Acme.BookStore.Books
{
    public class Book : AuditedAggregateRoot<Guid>
    {
        public string Name { get; set; }
        public BookType BookType { get; set; }
        public DateTime PublishDate { get; set; }
        public float Price { get; set; }
    }
}
