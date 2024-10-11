import { toast } from 'react-toastify';
import useAuthToken from '../../token/useAuthToken';
import { useState } from 'react';

const useAddEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuthToken(); 

  const addEvent = async (eventData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/addCalendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Error al agregar el evento');
      }

      const data = await response.json();
      
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

  return { addEvent, loading, error };
};

export default useAddEvent;
