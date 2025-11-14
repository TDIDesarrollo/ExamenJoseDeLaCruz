using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Examen.Models;

namespace Examen.Business
{
    public interface IJsonPlaceholderService
    {
        Task<IEnumerable<PostDto>> GetPostsAsync();
    }
}