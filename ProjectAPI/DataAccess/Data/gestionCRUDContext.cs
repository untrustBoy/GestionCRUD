using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DataAccess.Data
{
    public partial class gestionCRUDContext : DbContext
    {
        public gestionCRUDContext()
        {
        }

        public gestionCRUDContext(DbContextOptions<gestionCRUDContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<Logs> Logs { get; set; }
        public virtual DbSet<Post> Post { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(e => e.name).HasMaxLength(500);
            });

            modelBuilder.Entity<Logs>(entity =>
            {
                entity.Property(e => e.TimeStamp).HasColumnType("datetime");
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.Property(e => e.Body).HasMaxLength(500);

                entity.Property(e => e.Category).HasMaxLength(500);

                entity.Property(e => e.Title).HasMaxLength(500);
            });
        }
    }
}
