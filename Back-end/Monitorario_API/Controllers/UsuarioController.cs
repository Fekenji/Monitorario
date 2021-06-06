using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Monitorario_API.Data;
using Monitorario_API.Models;
using Microsoft.AspNetCore.Authorization;
using Monitorario_API.Services;

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

        [HttpGet]
        [Route("anonymous")]
        [AllowAnonymous]
        public string Anonymous() => "Anônimo";

        [HttpGet]
        [Route("authenticated")]
        [Authorize]
        public string Authenticated() => string.Format("Autenticado - {0}", User.Identity.Name);


        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Authenticate([FromBody] Usuario usuario)
        {
            try
            {
                var user = _context.Usuario.Where(u => u.RaUsuario == usuario.RaUsuario && u.SenhaUsuario == usuario.SenhaUsuario).FirstOrDefault();

                if (user == null)
                    return NotFound(new { message = usuario });

                var token = TokenServices.GenerateToken(user);
                user.SenhaUsuario = "";
                return new
                {
                    user = user,
                    token = token
                };
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPost]
        [Route("signup")]
        public async Task<ActionResult> Post(Usuario model)
        {
            try
            {
                _context.Usuario.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                    return Created($"api/usuario/{model.RaUsuario}", model);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados");
            }

            return BadRequest();

            // if(ModelState.IsValid)
            // {
            //     _context.Aluno.Add(model);
            //     await _context.SaveChangesAsync();
            //     return Created($"api/aluno/{model.RA}", model);
            // }
            // else
            // {
            //     return BadRequest(ModelState);
            // }
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