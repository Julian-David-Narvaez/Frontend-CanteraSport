import { useState } from 'react';
import useAuthToken from '../../token/useAuthToken';
import { toast } from 'react-toastify';
const useDeleteEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); 
  const { token } = useAuthToken(); 

  const deleteEvent = async (id) => {
    setLoading(true);
    setError(null);
    setMessage(null); 

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/deleteCalendar/${id}`, {
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
      setMessage(data.message); 
      toast.success(data.message, {autoClose:1300});
      setTimeout(() => {
        window.location.reload();;
      }, 1800);
      

      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteEvent, loading, error, message };
};

export default useDeleteEvent;
