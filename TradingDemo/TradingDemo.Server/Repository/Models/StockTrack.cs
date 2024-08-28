using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TradingDemo.Server.Repository.Models;

[Table("STOCK_TRACK")]
public partial class StockTrack
{
    [Key]
    [Column("STOCK_TRACK_ID")]
    public int StockTrackId { get; set; }

    [Column("STOCK_ID")]
    public int? StockId { get; set; }

    [Column("SHAREMARKET_DATE", TypeName = "datetime")]
    public DateTime SharemarketDate { get; set; }

    [Column("LOW_VALUE", TypeName = "decimal(18, 2)")]
    public decimal LowValue { get; set; }

    [Column("HIGH_VALUE", TypeName = "decimal(18, 2)")]
    public decimal HighValue { get; set; }

    [Column("OPEN_PRICE", TypeName = "decimal(18, 2)")]
    public decimal OpenPrice { get; set; }

    [Column("CLOSE_PRICE", TypeName = "decimal(18, 2)")]
    public decimal ClosePrice { get; set; }

    [Column("AVG_PRICE", TypeName = "decimal(18, 2)")]
    public decimal AvgPrice { get; set; }

    [Column("VOLUME", TypeName = "decimal(18, 2)")]
    public decimal Volume { get; set; }

    [ForeignKey("StockId")]
    [InverseProperty("StockTracks")]
    public virtual Stock? Stock { get; set; }
}
