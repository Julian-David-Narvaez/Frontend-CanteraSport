
import useAuthToken from "../../token/useAuthToken";
import { useCallback, useState } from "react";

const useListProfile = () => {
  const { token } = useAuthToken();
  const [profile, setProfile] = useState([]);

  const showProfile = useCallback(async () => {
    try {
      let url = `http://127.0.0.1:8000/api/listprofile`;

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
      setProfile(data);
    } catch (error) {
      console.error(error);
      setProfile([]);
    }
  }, [token]);

  return { profile, showProfile };
};

export default useListProfile;

