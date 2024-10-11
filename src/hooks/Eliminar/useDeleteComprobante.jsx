import { useState } from 'react';
import useAuthToken from '../../token/useAuthToken';
import { toast } from 'react-toastify';
const useDeleteComprobante = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const { token } = useAuthToken(); 

  const deleteComprobante = async (id) => {
    setLoading(true);
    setError(null);
     

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/deleteFactura/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el comprobante');
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

  return { deleteComprobante, loading, error};
};

export default useDeleteComprobante;
