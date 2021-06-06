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
    public class UsuarioHorarioController : Controller
    {
        private readonly MoniContext _context;
        public UsuarioHorarioController(MoniContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<UsuarioHorario>> GetAll()
        {
            return _context.UsuarioHorario.ToList();
        }

        [HttpGet("{UsuarioHorarioId}")]
        public ActionResult<List<UsuarioHorario>> Get(int UsuarioHorarioId)
        {
            try
            {
                var result = _context.UsuarioHorario.Find(UsuarioHorarioId);
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
        public async Task<ActionResult> post(UsuarioHorario model)
        {
            try
            {
                _context.UsuarioHorario.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/usuarioHorario/{model.IdUsuarioHorario}", model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpPut("{UsuarioHorarioId}")]
        public async Task<IActionResult> put(int UsuarioHorarioId, UsuarioHorario dadosUsuarioHorarioAlt)
        {
            try
            {
                //verifica se existe aluno a ser alterado
                var result = await _context.UsuarioHorario.FindAsync(UsuarioHorarioId);
                if (UsuarioHorarioId != result.IdUsuarioHorario)
                {
                    return BadRequest();
                }
                result.IdHorario = dadosUsuarioHorarioAlt.IdHorario;
                result.RaUsuario = dadosUsuarioHorarioAlt.RaUsuario;

                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpDelete("{UsuarioHorarioId}")]
        public async Task<ActionResult> delete(int UsuarioHorarioId)
        {
            try
            {
                //verifica se existe aluno a ser excluído
                var usuarioHorario = await _context.UsuarioHorario.FindAsync(UsuarioHorarioId);
                if (usuarioHorario == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(usuarioHorario);
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