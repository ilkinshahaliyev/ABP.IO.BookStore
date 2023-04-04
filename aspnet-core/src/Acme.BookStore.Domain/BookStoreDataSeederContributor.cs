using Acme.BookStore.Books;
using System;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;

namespace Acme.BookStore
{
    public class BookStoreDataSeederContributor : IDataSeedContributor, ITransientDependency
    {
        private readonly IRepository<Book, Guid> _bookRepository;

        public BookStoreDataSeederContributor(IRepository<Book, Guid> bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public async Task SeedAsync(DataSeedContext dataSeedContext)
        {
            if (await _bookRepository.GetCountAsync() <= 0)
            {
                await _bookRepository.InsertAsync(new()
                {
                    Name = "1984",
                    BookType = BookType.Dystopia,
                    PublishDate = new(1949, 6, 8),
                    Price = 19.99f
                },
                autoSave: true);

                await _bookRepository.InsertAsync(new()
                {
                    Name = "The Hitchhiker's Guide to the Galaxy",
                    BookType = BookType.ScienceFiction,
                    PublishDate = new(1995, 9, 27),
                    Price = 43.59f
                },
                autoSave: true);
            }
        }
    }
}
