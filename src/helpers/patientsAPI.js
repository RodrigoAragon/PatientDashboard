export const getPatients = async (page) => {
    try {
    const response = await fetch(`https://63bedcf7f5cfc0949b634fc8.mockapi.io/users?page=${page}&limit=10`);
        
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
        
    const data = await response.json();
        
    return data;
    } catch (e) {
        console.log(e)
    }
}