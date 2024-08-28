using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TradingDemo.Server.Repository.Models;

[Table("STOCK")]
public partial class Stock
{
    [Key]
    [Column("STOCK_ID")]
    public int StockId { get; set; }

    [Column("STOCK_NAME")]
    [StringLength(50)]
    [Unicode(false)]
    public string StockName { get; set; } = null!;

    [Column("STOCK_CODE")]
    [StringLength(50)]
    [Unicode(false)]
    public string StockCode { get; set; } = null!;

    [Column("SECTOR")]
    [StringLength(50)]
    [Unicode(false)]
    public string Sector { get; set; } = null!;

    [Column("CAPTIAL")]
    public long Captial { get; set; }

    [Column("EPS")]
    public int Eps { get; set; }

    [Column("PRICE_EARN")]
    public int PriceEarn { get; set; }

    [Column("PIRCE_BOOK")]
    public int PirceBook { get; set; }

    [Column("DIVDENT_YIELD")]
    public int DivdentYield { get; set; }

    [Column("ROE")]
    public int Roe { get; set; }

    [Column("LOW_VALUE")]
    public int LowValue { get; set; }

    [Column("HIGH_VALUE")]
    public int HighValue { get; set; }

    [Column("ANALYSIS_PRICE")]
    public int AnalysisPrice { get; set; }

    [Column("CREATED_BY")]
    public int CreatedBy { get; set; }

    [Column("CREATED_ON", TypeName = "datetime")]
    public DateTime? CreatedOn { get; set; }

    [Column("UPDATED_BY")]
    public int UpdatedBy { get; set; }

    [Column("UPDATED_ON", TypeName = "datetime")]
    public DateTime? UpdatedOn { get; set; }

    [InverseProperty("Stock")]
    public virtual ICollection<OrderTracker> OrderTrackers { get; set; } = new List<OrderTracker>();

    [InverseProperty("Stock")]
    public virtual ICollection<StockOrder> StockOrders { get; set; } = new List<StockOrder>();

    [InverseProperty("Stock")]
    public virtual ICollection<StockTrack> StockTracks { get; set; } = new List<StockTrack>();
}
