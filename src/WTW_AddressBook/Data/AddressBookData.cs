using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace WTW_AddressBook.Data
{
    public class AddressContext : DbContext
    {
        public DbSet<Address> Addresses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=./Addresses.db");
        }
    }

    public class Address
    {
        public int AddressId { get; set; }
        public string Name { get; set; }
        public string AddressLineOne { get; set; }
        public string AddressLineTwo { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Country { get; set; }
    }
}
