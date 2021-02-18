using Microsoft.EntityFrameworkCore;

namespace GeographyApi.Models
{
    public class GeographyContext : DbContext
    {
        public GeographyContext(DbContextOptions<GeographyContext> options)
            : base(options)
        {
        }

        public DbSet<Country> Countries { get; set; }
        public DbSet<State> States { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Country>().HasData(
                new Country
                {
                    Id = 1,
                    Name = "United States",
                    Code = "US"
                },
                new Country
                {
                    Id = 2,
                    Name = "Australia",
                    Code = "AU"
                },
                new Country
                {
                    Id = 3,
                    Name = "Canada",
                    Code = "CA"
                }

            );

            modelBuilder.Entity<State>().HasData(
                new State
                {
                    Id = 1,
                    Name = "Virginia",
                    Code = "VA",
                    CountryId = 1
                },
                new State
                {
                    Id = 2,
                    Name = "Maryland",
                    Code = "MD",
                    CountryId = 1
                },
                new State
                {
                    Id = 3,
                    Name = "California",
                    Code = "CA",
                    CountryId = 1
                }

            );
        }
    }
}