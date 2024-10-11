import { toast } from 'react-toastify';
import useAuthToken from '../../token/useAuthToken';
import { useState } from 'react';

const useAddNoticias = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuthToken();

  const addNotice = async (noticeData) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("titulo", noticeData.titulo);
      formData.append("descripcion", noticeData.descripcion);
      formData.append("image_url", noticeData.image_url); // Asegúrate de que este campo tenga el archivo

      const response = await fetch('http://127.0.0.1:8000/api/addEvent', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al agregar la noticia');
      }

      const data = await response.json();
      
      toast.success(data.message, { autoClose: 1300 });
      setTimeout(() => {
        window.location.reload();
      }, 1800);
      return data;

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { addNotice, loading, error };
};

export default useAddNoticias;
