using System.ComponentModel.DataAnnotations;

namespace Monitorario_API.Models
{
    public class Usuario
    {
        [Key]
        public string RaUsuario { get; set; }
        public string EmailUsuario { get; set; }
        public string SenhaUsuario { get; set; }
        public string CursoUsuario { get; set; }
        public bool IsMonitor { get; set; }
    }
}