using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TradingDemo.Server.Repository.Models;

[Table("STOCK_TRACK")]
public partial class StockTrack
{
    [Column("STOCK_CODE")]
    [StringLength(255)]
    [Unicode(false)]
    public string StockCode { get; set; } = null!;

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

    [Column("CHANGE_PERCENT", TypeName = "decimal(18, 4)")]
    public decimal ChangePercent { get; set; }

    [Column("VOLUME")]
    [StringLength(255)]
    [Unicode(false)]
    public string? Volume { get; set; }

    [Key]
    [Column("StockTrackID")]
    public int StockTrackId { get; set; }
}
