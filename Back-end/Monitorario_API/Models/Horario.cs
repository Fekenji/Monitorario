using System;
using System.ComponentModel.DataAnnotations;

namespace Monitorario_API.Models
{
    public class Horario
    {
        [Key]
        public int IdHorario { get; set; }
        public string Materia { get; set; }
        public bool IsReservado { get; set; }
        public DateTime horario { get; set; }
        public string DiaSemana { get; set; }
        public string RaMonitor { get; set; }
    }
}