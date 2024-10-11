import { useState } from 'react';
import useAuthToken from '../../token/useAuthToken';
const useDeleteNotice = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { token } = useAuthToken(); 

  const deleteNotice = async (id) => {
    setLoading(true);
    setError(null);
     

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/deleteEvent/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el evento');
      }

      const data = await response.json();
   
      alert(data.message);
      window.location.reload();

      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteNotice, loading, error};
};

export default useDeleteNotice;
