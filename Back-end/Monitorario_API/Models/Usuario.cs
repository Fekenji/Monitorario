using System.ComponentModel.DataAnnotations;

namespace Monitorario_API.Models
{
    public class Usuario
    {
        [Key]
        // [Required(ErrorMessage = "O campo RA é obrigatório")]
        // [StringLength(5, ErrorMessage = "O RA deve conter 5 caracteres")]
        public string RaUsuario { get; set; }

        // [Required(ErrorMessage = "O campo SenhaUsuario é obrigatório")]
        // [MaxLength(64, ErrorMessage = "O campo senha deve ter entre 8 e 64 caracteres")]
        // [MinLength(8, ErrorMessage = "O campo senha deve ter entre 8 e 64 caracteres")]
        public string SenhaUsuario { get; set; }

        // [Required(ErrorMessage = "O campo CursoUsuario é obrigatório")]
        // [Range(10, 99, ErrorMessage = "O campo curso deve ter 2 caracteres")]
        public int CursoUsuario { get; set; }

        // [Required(ErrorMessage = "O campo IsMonitor é obrigatório")]
        public bool IsMonitor { get; set; }
    }
}