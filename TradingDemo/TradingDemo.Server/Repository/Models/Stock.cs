using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TradingDemo.Server.Repository.Models;

[Table("STOCK")]
[Index("StockCode", Name = "UQ__STOCK__DEEA39AC2342ACFC", IsUnique = true)]
public partial class Stock
{
    [Column("STOCK_CODE")]
    [StringLength(255)]
    [Unicode(false)]
    public string StockCode { get; set; } = null!;

    [Column("STOCK_NAME")]
    [StringLength(255)]
    [Unicode(false)]
    public string StockName { get; set; } = null!;

    [Column("SECTOR")]
    [StringLength(255)]
    [Unicode(false)]
    public string Sector { get; set; } = null!;

    [Column("CAPTIAL")]
    [StringLength(255)]
    [Unicode(false)]
    public string Captial { get; set; } = null!;

    [Column("DIVDENT_YIELD", TypeName = "decimal(18, 2)")]
    public decimal? DivdentYield { get; set; }

    [Column("LOW_VALUE", TypeName = "decimal(18, 2)")]
    public decimal? LowValue { get; set; }

    [Column("HIGH_VALUE", TypeName = "decimal(18, 2)")]
    public decimal? HighValue { get; set; }

    [Column("ANALYSIS_PRICE", TypeName = "decimal(18, 2)")]
    public decimal? AnalysisPrice { get; set; }

    [Key]
    [Column("StockID")]
    public int StockId { get; set; }
}
