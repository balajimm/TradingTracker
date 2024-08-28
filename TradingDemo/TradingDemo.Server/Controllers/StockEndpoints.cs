using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using TradingDemo.Server.Repository;
using TradingDemo.Server.Repository.Models;
using Microsoft.AspNetCore.Mvc;
namespace TradingDemo.Server.Controllers;

[ApiController]
[Route("[controller]")]
public static class StockEndpoints
{
    public static void MapStockEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Stock").WithTags(nameof(Stock));

        group.MapGet("/", async (StocksDbContext db) =>
        {
            return await db.Stocks.ToListAsync();
        })
        .WithName("GetAllStocks")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<Stock>, NotFound>> (int stockid, StocksDbContext db) =>
        {
            return await db.Stocks.AsNoTracking()
                .FirstOrDefaultAsync(model => model.StockId == stockid)
                is Stock model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetStockById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int stockid, Stock stock, StocksDbContext db) =>
        {
            var affected = await db.Stocks
                .Where(model => model.StockId == stockid)
                .ExecuteUpdateAsync(setters => setters
                    .SetProperty(m => m.StockId, stock.StockId)
                    .SetProperty(m => m.StockName, stock.StockName)
                    .SetProperty(m => m.StockCode, stock.StockCode)
                    .SetProperty(m => m.Sector, stock.Sector)
                    .SetProperty(m => m.Captial, stock.Captial)
                    .SetProperty(m => m.Eps, stock.Eps)
                    .SetProperty(m => m.PriceEarn, stock.PriceEarn)
                    .SetProperty(m => m.PirceBook, stock.PirceBook)
                    .SetProperty(m => m.DivdentYield, stock.DivdentYield)
                    .SetProperty(m => m.Roe, stock.Roe)
                    .SetProperty(m => m.LowValue, stock.LowValue)
                    .SetProperty(m => m.HighValue, stock.HighValue)
                    .SetProperty(m => m.AnalysisPrice, stock.AnalysisPrice)
                    .SetProperty(m => m.CreatedBy, stock.CreatedBy)
                    .SetProperty(m => m.CreatedOn, stock.CreatedOn)
                    .SetProperty(m => m.UpdatedBy, stock.UpdatedBy)
                    .SetProperty(m => m.UpdatedOn, stock.UpdatedOn)
                    );
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateStock")
        .WithOpenApi();

        group.MapPost("/", async (Stock stock, StocksDbContext db) =>
        {
            db.Stocks.Add(stock);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/Stock/{stock.StockId}",stock);
        })
        .WithName("CreateStock")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int stockid, StocksDbContext db) =>
        {
            var affected = await db.Stocks
                .Where(model => model.StockId == stockid)
                .ExecuteDeleteAsync();
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteStock")
        .WithOpenApi();
    }
}
