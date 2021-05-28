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
    public class UsuarioController : Controller
    {
        private readonly MoniContext _context;
        public UsuarioController(MoniContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Usuario>> GetAll()
        {
            return _context.Usuario.ToList();
        }

        [HttpGet("{UsuarioRa}")]
        public ActionResult<List<Usuario>> Get(string UsuarioRa)
        {
            try
            {
                var result = _context.Usuario.Find(UsuarioRa);
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
        public async Task<ActionResult> post(Usuario model)
        {
            try
            {
                _context.Usuario.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/usuario/{model.RaUsuario}", model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpPut("{UsuarioRA}")]
        public async Task<IActionResult> put(string UsuarioRa, Usuario dadosUsuarioAlt)
        {
            try
            {
                //verifica se existe aluno a ser alterado
                var result = await _context.Usuario.FindAsync(UsuarioRa);
                if (UsuarioRa != result.RaUsuario)
                {
                    return BadRequest();
                }
                result.RaUsuario = dadosUsuarioAlt.RaUsuario;
                result.EmailUsuario = dadosUsuarioAlt.EmailUsuario;
                result.SenhaUsuario = dadosUsuarioAlt.SenhaUsuario;
                result.CursoUsuario = dadosUsuarioAlt.CursoUsuario;
                result.IsMonitor = dadosUsuarioAlt.IsMonitor;

                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpDelete("{UsuarioRa}")]
        public async Task<ActionResult> delete(string UsuarioRa)
        {
            try
            {
                //verifica se existe aluno a ser excluído
                var usuario = await _context.Usuario.FindAsync(UsuarioRa);
                if (usuario == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(usuario);
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