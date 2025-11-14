using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Examen.DataAccess
{
    public interface ILogger
    {
        void Log(string message, string level = "INFO");
    }
}