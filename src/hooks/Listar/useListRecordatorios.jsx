import { useState, useEffect } from 'react';
import useAuthToken from '../../token/useAuthToken';


const useFetchRecordatorios = () => {
  const [recordatorios, setRecordatorios] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthToken();

  useEffect(() => {
    const obtenerRecordatorios = async () => {
      try {
        
        const response = await fetch('http://127.0.0.1:8000/api/showCalendar', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener los recordatorios');
        }

        const data = await response.json();
        setRecordatorios(data);
        setLoading(false);
        
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    obtenerRecordatorios();
  }, [token]);

  return { recordatorios, loading, error };
};

export default useFetchRecordatorios;