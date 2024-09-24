using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TradingDemo.Server.Repository.Models;

namespace TradingDemo.Server.Repository;

public partial class StocksDbContext : DbContext
{
    public StocksDbContext()
    {
    }

    public StocksDbContext(DbContextOptions<StocksDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Stock> Stocks { get; set; }

    public virtual DbSet<StockTrack> StockTracks { get; set; }

    public virtual DbSet<Suser> Susers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=BALA \\SQLEXPRESS;Initial Catalog=StockTracker;Integrated Security=True;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Stock>(entity =>
        {
            entity.HasKey(e => e.StockId).HasName("PK_Stocks");
        });

        modelBuilder.Entity<StockTrack>(entity =>
        {
            entity.HasKey(e => e.StockTrackId).HasName("PK_Stock_Track");
        });

        modelBuilder.Entity<Suser>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__SUSER__F3BEEBFF6705C198");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
