using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QLBC3.App_Data.Database;
using QLBC3.Models;

namespace QLBC3.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Invoice> Invoice { get; set; }

        public DbSet<Categorize> Categorize { get; set; }

        public DbSet<WareHouse> WareHouse { get; set; }

        public DbSet<Capital> Capital { get; set; }

        public DbSet<Trip> Trip { get; set; }

        public DbSet<ProductInTrip> ProductInTrip { get; set; }

        public DbSet<ExportProduct> ExportProduct { get; set; }
        

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}
