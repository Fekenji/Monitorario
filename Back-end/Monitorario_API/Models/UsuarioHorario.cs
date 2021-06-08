using System.ComponentModel.DataAnnotations;

namespace Monitorario_API.Models
{
    public class UsuarioHorario
    {
        [Key]
        public int IdUsuarioHorario { get; set; }

        public string RaUsuario { get; set; }

        public int IdHorario { get; set; }
    }
}