using Shouldly;
using System.Threading.Tasks;
using Xunit;
using System;
using Volo.Abp.Validation;
using System.Linq;

namespace Acme.BookStore.Books
{
    public class BookAppService_Tests : BookStoreApplicationTestBase
    {
        private readonly IBookAppService _bookAppService;

        public BookAppService_Tests()
        {
            _bookAppService = GetRequiredService<IBookAppService>();
        }

        [Fact]
        public async Task Should_Get_List_Of_Books()
        {
            //Act
            var result = await _bookAppService.GetListAsync(new());

            //Assert
            result.TotalCount.ShouldBeGreaterThan(0);
            result.Items.ShouldContain(book => book.Name == "1984");
        }

        [Fact]
        public async Task Should_Create_A_Valid_Book()
        {
            //Act
            var result = await _bookAppService.CreateAsync(new()
            {
                Name = "New test book",
                Price = 20,
                PublishDate = DateTime.Now,
                BookType = BookType.Adventure
            });

            //Assert
            result.Id.ShouldNotBe(Guid.Empty);
            result.Name.ShouldBe("New test book");
        }

        [Fact]
        public async Task Should_Not_Create_A_Book_Without_Name()
        {
            var exception = await Assert.ThrowsAsync<AbpValidationException>(async () =>
            {
                await _bookAppService.CreateAsync(new()
                {
                    Name = "",
                    Price = 20,
                    PublishDate = DateTime.Now,
                    BookType = BookType.Science
                });
            });

            exception.ValidationErrors.ShouldContain(err => err.MemberNames.Any(mem => mem == "Name"));
        }
    }
}
