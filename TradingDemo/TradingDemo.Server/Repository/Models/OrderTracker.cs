using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TradingDemo.Server.Repository.Models;

[Table("ORDER_TRACKER")]
public partial class OrderTracker
{
    [Key]
    [Column("ORDER_ID")]
    public int OrderId { get; set; }

    [Column("STOCK_ID")]
    public int? StockId { get; set; }

    [Column("ORDER_TYPE")]
    public int OrderType { get; set; }

    [Column("ORDER_DATE", TypeName = "datetime")]
    public DateTime OrderDate { get; set; }

    [Column("QUANTITY")]
    public int Quantity { get; set; }

    [Column("PRICE")]
    public int Price { get; set; }

    [Column("LTP")]
    public int Ltp { get; set; }

    [Column("DAY_PROFIT_LOSS")]
    public int DayProfitLoss { get; set; }

    [Column("DAY_PROFIT_LOSS_PERCENTAGE")]
    public int DayProfitLossPercentage { get; set; }

    [Column("CREATED_BY")]
    public int CreatedBy { get; set; }

    [Column("CREATED_ON", TypeName = "datetime")]
    public DateTime? CreatedOn { get; set; }

    [Column("UPDATED_BY")]
    public int UpdatedBy { get; set; }

    [Column("UPDATED_ON", TypeName = "datetime")]
    public DateTime? UpdatedOn { get; set; }

    [ForeignKey("StockId")]
    [InverseProperty("OrderTrackers")]
    public virtual Stock? Stock { get; set; }
}
