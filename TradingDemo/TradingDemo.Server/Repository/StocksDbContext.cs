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

    public virtual DbSet<OrderTracker> OrderTrackers { get; set; }

    public virtual DbSet<Stock> Stocks { get; set; }

    public virtual DbSet<StockOrder> StockOrders { get; set; }

    public virtual DbSet<StockTrack> StockTracks { get; set; }

    public virtual DbSet<Suser> Susers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=BALA\\SQLEXPRESS;Initial Catalog=StockTracker;Integrated Security=True;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<OrderTracker>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__ORDER_TR__460A94643737FE23");

            entity.HasOne(d => d.Stock).WithMany(p => p.OrderTrackers).HasConstraintName("FK__ORDER_TRA__STOCK__4316F928");
        });

        modelBuilder.Entity<Stock>(entity =>
        {
            entity.HasKey(e => e.StockId).HasName("PK__STOCK__02C0D2F04C93ACEC");
        });

        modelBuilder.Entity<StockOrder>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__STOCK_OR__460A94640B45C9DE");

            entity.HasOne(d => d.Stock).WithMany(p => p.StockOrders).HasConstraintName("FK__STOCK_ORD__STOCK__45F365D3");
        });

        modelBuilder.Entity<StockTrack>(entity =>
        {
            entity.HasKey(e => e.StockTrackId).HasName("PK__STOCK_TR__82E5E4E8382046F1");

            entity.HasOne(d => d.Stock).WithMany(p => p.StockTracks).HasConstraintName("FK__STOCK_TRA__STOCK__72C60C4A");
        });

        modelBuilder.Entity<Suser>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__SUSER__F3BEEBFF6705C198");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
