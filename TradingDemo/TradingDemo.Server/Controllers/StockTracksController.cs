using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TradingDemo.Server.Repository;
using TradingDemo.Server.Repository.Models;

namespace TradingDemo.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockTracksController : ControllerBase
    {
        private readonly StocksDbContext _context;

        public StockTracksController(StocksDbContext context)
        {
            _context = context;
        }

        // GET: api/StockTracks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StockTrack>>> GetStockTracks()
        {
            return await _context.StockTracks.ToListAsync();
        }

        // GET: api/StockTracks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<StockTrack>>> GetStockTrack(string id)
        {
            var stockTrack = await _context.StockTracks.Where(item=> item.StockCode == id).ToListAsync(); 

            if (stockTrack == null)
            {
                return NotFound();
            }

            return stockTrack;
        }

        // PUT: api/StockTracks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStockTrack(int id, StockTrack stockTrack)
        {
            if (id != stockTrack.StockTrackId)
            {
                return BadRequest();
            }

            _context.Entry(stockTrack).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StockTrackExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/StockTracks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StockTrack>> PostStockTrack(StockTrack stockTrack)
        {
            _context.StockTracks.Add(stockTrack);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStockTrack", new { id = stockTrack.StockTrackId }, stockTrack);
        }

        // DELETE: api/StockTracks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStockTrack(int id)
        {
            var stockTrack = await _context.StockTracks.FindAsync(id);
            if (stockTrack == null)
            {
                return NotFound();
            }

            _context.StockTracks.Remove(stockTrack);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StockTrackExists(int id)
        {
            return _context.StockTracks.Any(e => e.StockTrackId == id);
        }
    }
}
