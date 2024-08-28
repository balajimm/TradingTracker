using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TradingDemo.Server.Repository.Models;

[Table("STOCK_ORDER")]
public partial class StockOrder
{
    [Key]
    [Column("ORDER_ID")]
    public int OrderId { get; set; }

    [Column("STOCK_ID")]
    public int? StockId { get; set; }

    [Column("QUANTITY")]
    public int Quantity { get; set; }

    [Column("AVG_COST")]
    public int AvgCost { get; set; }

    [Column("CURRENT_VALUE")]
    public int CurrentValue { get; set; }

    [Column("LTP")]
    public int Ltp { get; set; }

    [Column("AVG_PROFIT_LOSS")]
    public int AvgProfitLoss { get; set; }

    [Column("AVG_PROFIT_LOSS_PERCENTAGE")]
    public int AvgProfitLossPercentage { get; set; }

    [Column("DAY_PROFIT_LOSS")]
    public int DayProfitLoss { get; set; }

    [Column("DAY_PROFIT_LOSS_PERCENTAGE")]
    public int DayProfitLossPercentage { get; set; }

    [Column("TARGET_PRICE")]
    public int? TargetPrice { get; set; }

    [Column("TARGET_PERCENTAGE")]
    public int? TargetPercentage { get; set; }

    [Column("CREATED_BY")]
    public int CreatedBy { get; set; }

    [Column("CREATED_ON", TypeName = "datetime")]
    public DateTime? CreatedOn { get; set; }

    [Column("UPDATED_BY")]
    public int UpdatedBy { get; set; }

    [Column("UPDATED_ON", TypeName = "datetime")]
    public DateTime? UpdatedOn { get; set; }

    [ForeignKey("StockId")]
    [InverseProperty("StockOrders")]
    public virtual Stock? Stock { get; set; }
}
