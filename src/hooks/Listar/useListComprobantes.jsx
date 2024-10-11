import { useState, useEffect } from 'react';
import useAuthToken from '../../token/useAuthToken';

const useListComprobantes = () => {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuthToken();

  useEffect(() => {
    const listFacturas = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('http://127.0.0.1:8000/api/showFactura', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener las facturas');
        }

        const data = await response.json();
        setFacturas(data.facturas);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    listFacturas();
  }, [token]);

  return { facturas, loading, error };
};

export default useListComprobantes;
