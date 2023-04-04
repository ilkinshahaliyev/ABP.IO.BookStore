using System;
using System.ComponentModel.DataAnnotations;

namespace Acme.BookStore.Books
{
    public class UpdateBookDto
    {
        [Required]
        [StringLength(128)]
        public string Name { get; set; }

        [Required]
        public BookType BookType { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime PublishDate { get; set; }

        [Required]
        public float Price { get; set; }
    }
}
