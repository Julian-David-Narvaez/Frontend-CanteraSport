import { useState, useEffect } from 'react';
import useAuthToken from '../../token/useAuthToken';

const useListNoticias = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuthToken(); 

  useEffect(() => {
    const fetchNoticias = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/showEvent', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener las noticias');
        }

        const data = await response.json();
        setNotices(data.eventos); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, [token]);

  return { notices, loading, error };
};

export default useListNoticias;

