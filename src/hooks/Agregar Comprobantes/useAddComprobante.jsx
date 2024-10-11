import { toast } from 'react-toastify';
import useAuthToken from '../../token/useAuthToken';
import { useState } from 'react';

const useAddComprobante = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuthToken(); 

  const addComprobante = async (noticeComprobante) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('titulo', noticeComprobante.titulo);
      formData.append('descripcion', noticeComprobante.descripcion);
      formData.append('comprobante_pago', noticeComprobante.comprobante_pago);

      const response = await fetch('http://127.0.0.1:8000/api/addFactura', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al agregar el comprobante');
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

  return { addComprobante, loading, error };
};

export default useAddComprobante;
