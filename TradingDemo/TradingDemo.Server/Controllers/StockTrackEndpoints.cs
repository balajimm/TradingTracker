using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using TradingDemo.Server.Repository;
using TradingDemo.Server.Repository.Models;
using Microsoft.AspNetCore.Mvc;
namespace TradingDemo.Server.Controllers;
[ApiController]
[Route("[controller]")]
public static class StockTrackEndpoints
{
    public static void MapStockTrackEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/StockTrack").WithTags(nameof(StockTrack));

        group.MapGet("/", async (StocksDbContext db) =>
        {
            return await db.StockTracks.ToListAsync();
        })
        .WithName("GetAllStockTracks")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<List<StockTrack>>, NotFound>> (int stockid, StocksDbContext db) =>
        {
            return await db.StockTracks.AsNoTracking()
                .Where(model => model.StockId == stockid).ToListAsync()
                is List<StockTrack> model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetStockTrackById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int stocktrackid, StockTrack stockTrack, StocksDbContext db) =>
        {
            var affected = await db.StockTracks
                .Where(model => model.StockTrackId == stocktrackid)
                .ExecuteUpdateAsync(setters => setters
                    .SetProperty(m => m.StockTrackId, stockTrack.StockTrackId)
                    .SetProperty(m => m.StockId, stockTrack.StockId)
                    .SetProperty(m => m.SharemarketDate, stockTrack.SharemarketDate)
                    .SetProperty(m => m.LowValue, stockTrack.LowValue)
                    .SetProperty(m => m.HighValue, stockTrack.HighValue)
                    .SetProperty(m => m.OpenPrice, stockTrack.OpenPrice)
                    .SetProperty(m => m.ClosePrice, stockTrack.ClosePrice)
                    .SetProperty(m => m.AvgPrice, stockTrack.AvgPrice)
                    .SetProperty(m => m.Volume, stockTrack.Volume)
                    );
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateStockTrack")
        .WithOpenApi();

        group.MapPost("/", async (StockTrack stockTrack, StocksDbContext db) =>
        {
            db.StockTracks.Add(stockTrack);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/StockTrack/{stockTrack.StockTrackId}",stockTrack);
        })
        .WithName("CreateStockTrack")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int stocktrackid, StocksDbContext db) =>
        {
            var affected = await db.StockTracks
                .Where(model => model.StockTrackId == stocktrackid)
                .ExecuteDeleteAsync();
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteStockTrack")
        .WithOpenApi();
    }
}
