import Swal from 'sweetalert2';

const API_BASE_URL = 'https://localhost:7206/api/posts';

export const getPosts = async () => {
    try {
        const response = await fetch(API_BASE_URL);

        if (!response.ok) {
            const errorData = await response.json();
            
            Swal.fire({
                icon: 'error',
                title: 'Error del Servidor',
                text: errorData.message || 'Ocurrió un error al obtener los datos del servidor.',
                footer: 'Verifique que el backend de .NET esté corriendo y accesible.'
            });

            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        if (error.message.includes('fetch')) {
             Swal.fire({
                icon: 'error',
                title: 'Error de Conexión',
                text: 'No se pudo conectar con el servidor de backend (.NET).',
                footer: 'Asegúrese de que el proyecto Examen.Presentation esté iniciado.'
            });
        }
        throw error;
    }
};