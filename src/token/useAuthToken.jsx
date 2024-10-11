import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function useAuthToken() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const saveToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate("/")
    
  };

  return { token, saveToken, removeToken };
}

export default useAuthToken;

