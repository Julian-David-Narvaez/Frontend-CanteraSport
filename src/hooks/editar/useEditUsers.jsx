import { useState } from "react";

const useEditUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editUser = async (id, updatedData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }

      return await response.json();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { editUser, loading, error };
};

export default useEditUsers;
