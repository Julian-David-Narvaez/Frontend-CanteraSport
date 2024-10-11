import { useState, useEffect } from "react";
import useAuthToken from "../../token/useAuthToken";


const useListDeportes = () => {
  const [deportes, setDeportes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthToken();

  useEffect(() => {
    const obtenerDeportes = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/watchsports", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los deportes");
        }

        const data = await response.json();
        setDeportes(data.deportes || []);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    obtenerDeportes();
  }, [token]);

  return { deportes, loading, error };
};

export default useListDeportes;
