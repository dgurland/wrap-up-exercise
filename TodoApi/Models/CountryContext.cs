using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models
{
    public class CountryContext : DbContext
    {
        public CountryContext(DbContextOptions<CountryContext> options)
            : base(options)
        {
        }

        public DbSet<Country> Countries { get; set; }
    }
}