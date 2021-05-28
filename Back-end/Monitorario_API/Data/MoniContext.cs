using Microsoft.EntityFrameworkCore;
using Monitorario_API.Models;

namespace Monitorario_API.Data
{
    public class MoniContext : DbContext
    {
        public MoniContext(DbContextOptions<MoniContext> options) : base(options)
        {

        }

        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<UsuarioHorario> UsuarioHorario { get; set; }
        public DbSet<Horario> Horario { get; set; }
    }
}