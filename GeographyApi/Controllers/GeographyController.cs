using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GeographyApi.Models;

namespace GeographyApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeographyController : ControllerBase
    {
        private readonly GeographyContext _context;

        public GeographyController(GeographyContext context)
        {
            _context = context;
        }

        // GET: api/Geography
        [HttpGet("Countries")]
        public async Task<ActionResult<IEnumerable<Country>>> GetCountries()
        {
            return await _context.Countries.ToListAsync();
        }

        // GET: api/Geography
        [HttpGet("States/{id}")]
        public async Task<ActionResult<IEnumerable<State>>> GetStates(long id)
        {
            return await _context.States.Where(state => state.CountryId == id).ToListAsync();
        }

        // GET: api/Geography/5
        [HttpGet("Countries/{id}")]
        public async Task<ActionResult<Country>> GetCountry(long id)
        {
            var country = await _context.Countries.FindAsync(id);

            if (country == null)
            {
                return NotFound();
            }

            return country;
        }

        // POST: api/Geography
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Countries")]
        public async Task<ActionResult<Country>> PostCountry(Country country)
        {
            _context.Countries.Add(country);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCountry", new { id = country.Id }, country);
        }

        // DELETE: api/Geography/5
        [HttpDelete("Countries/{id}")]
        public async Task<IActionResult> DeleteCountry(long id)
        {
            var country = await _context.Countries.FindAsync(id);
            if (country == null)
            {
                return NotFound();
            }

            _context.Countries.Remove(country);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Geography
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("States")]
        public async Task<ActionResult<Country>> PostState(State state)
        {
            _context.States.Add(state);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetState", new { id = state.Id }, state);
        }

        // DELETE: api/Geography/5
        [HttpDelete("States/{id}")]
        public async Task<IActionResult> DeleteState(long id)
        {
            var state = await _context.States.FindAsync(id);
            if (state == null)
            {
                return NotFound();
            }

            _context.States.Remove(state);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CountryExists(long id)
        {
            return _context.Countries.Any(e => e.Id == id);
        }

        private bool StateExists(long id)
        {
            return _context.States.Any(e => e.Id == id);
        }
    }
}
