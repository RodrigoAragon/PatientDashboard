export const getPatients = async () => {
    try {
    // Hacemos la petición a la URL de la API.
    const response = await fetch('https://63bedcf7f5cfc0949b634fc8.mockapi.io/users');
        
    // Si la respuesta no es exitosa (ej: error 404 o 500), lanzamos un error.
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
        
    // Convertimos la respuesta a formato JSON.
    const data = await response.json();
        
    // Actualizamos el estado 'users' con los datos recibidos.
    return data;
    } catch (e) {
    // Si hay algún error en el proceso, lo guardamos en el estado 'error'.
    }
}