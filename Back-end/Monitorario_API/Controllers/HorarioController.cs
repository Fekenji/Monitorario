using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Monitorario_API.Data;
using Monitorario_API.Models;

namespace Monitorario_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HorarioController : Controller
    {
        private readonly MoniContext _context;
        public HorarioController(MoniContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Horario>> GetAll()
        {
            return _context.Horario.ToList();
        }

        [HttpGet("{HorarioId}")]
        public ActionResult<List<Horario>> Get(int HorarioId)
        {
            try
            {
                var result = _context.Horario.Find(HorarioId);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> post(Horario model)
        {
            try
            {
                _context.Horario.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/horario/{model.IdHorario}", model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpPut("{HorarioId}")]
        public async Task<IActionResult> put(int HorarioId, Horario dadosHorarioAlt)
        {
            try
            {
                //verifica se existe aluno a ser alterado
                var result = await _context.Horario.FindAsync(HorarioId);
                if (HorarioId != result.IdHorario)
                {
                    return BadRequest();
                }
                result.Materia = dadosHorarioAlt.Materia;
                result.RaMonitor = dadosHorarioAlt.RaMonitor;
                result.IsReservado = dadosHorarioAlt.IsReservado;
                result.horario = dadosHorarioAlt.horario;
                result.DiaSemana = dadosHorarioAlt.DiaSemana;

                await _context.SaveChangesAsync();
                return Ok();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpDelete("{HorarioId}")]
        public async Task<ActionResult> delete(int HorarioId)
        {
            try
            {
                //verifica se existe aluno a ser excluído
                var horario = await _context.Horario.FindAsync(HorarioId);
                if (horario == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(horario);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu deletar
            return BadRequest();
        }
    }
}