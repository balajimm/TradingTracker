using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TradingDemo.Server.Repository.Models;

[Table("SUSER")]
public partial class Suser
{
    [Key]
    [Column("USER_ID")]
    public int UserId { get; set; }

    [Column("USER_NAME")]
    [StringLength(50)]
    [Unicode(false)]
    public string UserName { get; set; } = null!;

    [Column("PWD")]
    [StringLength(50)]
    [Unicode(false)]
    public string Pwd { get; set; } = null!;

    [Column("MOBILE_NUMBER")]
    [StringLength(50)]
    [Unicode(false)]
    public string MobileNumber { get; set; } = null!;

    [Column("EMAIL_ID")]
    [StringLength(50)]
    [Unicode(false)]
    public string EmailId { get; set; } = null!;

    [Column("USER_ADDRESS")]
    [StringLength(250)]
    [Unicode(false)]
    public string UserAddress { get; set; } = null!;

    [Column("MONTHLY_INVESMENT")]
    public int MonthlyInvesment { get; set; }

    [Column("EXPECTED_PERCENTAGE")]
    public int ExpectedPercentage { get; set; }

    [Column("CREATED_BY")]
    public int CreatedBy { get; set; }

    [Column("CREATED_ON", TypeName = "datetime")]
    public DateTime? CreatedOn { get; set; }

    [Column("UPDATED_BY")]
    public int UpdatedBy { get; set; }

    [Column("UPDATED_ON", TypeName = "datetime")]
    public DateTime? UpdatedOn { get; set; }
}
