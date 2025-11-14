using Examen.Business;
using Examen.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class PostsController : ControllerBase
{
    private readonly IJsonPlaceholderService _jsonPlaceholderService;
    public PostsController(IJsonPlaceholderService jsonPlaceholderService)
    {
        _jsonPlaceholderService = jsonPlaceholderService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PostDto>>> GetPosts()
    {
        try
        {
            var posts = await _jsonPlaceholderService.GetPostsAsync();
            return Ok(posts);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error en el servidor al obtener los datos", details = ex.Message });
        }
    }
}