import useAuthToken from "../../token/useAuthToken";
import { useCallback, useState } from "react";

const useListUser = () => {
  const { token } = useAuthToken();
  const [users, setUsers] = useState([]);

  const showUsers = useCallback(async (search,estado) => {
    try {
      let url = `http://127.0.0.1:8000/api/seeusers`;

      const params = new URLSearchParams();
        
        if (search) {
          params.append("search", search);
        }
        if (estado) {
          params.append("estado", estado);
        }
        if (params.toString()) {
          url += `?${params.toString()}`;
        }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener las facturas");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      setUsers([]);
    }
  }, [token]);

  return { users, showUsers };
};

export default useListUser;
