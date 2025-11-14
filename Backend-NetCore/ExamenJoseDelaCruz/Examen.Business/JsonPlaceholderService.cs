using Examen.DataAccess;
using Examen.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Linq;

namespace Examen.Business
{
    public class JsonPlaceholderService : IJsonPlaceholderService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger _logger;

        public JsonPlaceholderService(HttpClient httpClient, ILogger logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }
        public async Task<IEnumerable<PostDto>> GetPostsAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync("posts");
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();
                var posts = JsonSerializer.Deserialize<List<PostDto>>(responseBody, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                if (posts == null || !posts.Any())
                {
                    _logger.Log("Respuesta de la API recibida, pero el cuerpo de datos está vacío", "WARNING");
                    throw new InvalidOperationException("La API devolvió una respuesta vacía o nula");
                }

                return posts;
            }
            catch (HttpRequestException ex)
            {
                _logger.Log($"Error de conexión al obtener posts: {ex.Message}", "ERROR");
                throw new Exception("Error de conexión al acceder a la API externa", ex);
            }
            catch (JsonException ex)
            {
                _logger.Log($"Error de formato JSON al deserializar la respuesta: {ex.Message}", "ERROR");
                throw new Exception("Error de formato (JSON) al procesar la respuesta de la API", ex);
            }
            catch (Exception ex)
            {
                _logger.Log($"Error inesperado en GetPostsAsync: {ex.Message}", "CRITICAL");
                throw;
            }
        }
    }
}