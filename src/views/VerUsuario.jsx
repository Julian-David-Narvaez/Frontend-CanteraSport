import { useState, useEffect } from "react";
import useListUser from "../hooks/Listar/useListUser";
import useEditUsers from "../hooks/editar/useEditUsers";
import {
  RiEdit2Fill,
  RiDownloadLine,
  RiSearchLine,
  RiCheckFill,
} from "react-icons/ri";
import useDescargarUsers from "../hooks/DescargarExcel/useDescargarUsers";
import { toast } from "react-toastify";
const VerUsuario = () => {
  const { users, showUsers } = useListUser();
  const { editUser, loading, error } = useEditUsers();
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const { handleDownloadExcel } = useDescargarUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEstado, setSelectedAnio] = useState("");
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const role = localStorage.getItem("role");

    setUserRole(role);
  }, []);

  useEffect(() => {
    showUsers(searchQuery, selectedEstado);
  }, [showUsers, searchQuery, selectedEstado]);

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditedUserData(user);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await editUser(editingUserId, editedUserData);
    setEditingUserId(null);
    showUsers();
    toast.success("usuario editado correctamente");
  };
  const handleDownload = () => {
    handleDownloadExcel(searchQuery, selectedEstado);
  };

  const handleEstadoChange = (estado) => {
    setSelectedAnio(estado);
    showUsers(searchQuery, estado);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 mt-4 xl:mt-0">
        Lista de usuarios
      </h1>

      {userRole !== "estudiante" && (
        <div className="flex">
          <div className="xl:relative mr-4 ">
            <button
              onClick={handleDownload}
              className="flex justify-center items-center gap-2 xl:gap-2 px-3 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
            >
              <span className="">Generar Reporte Usuarios</span>
              <RiDownloadLine className="mr-0 xl:mr-2" />
            </button>
          </div>
          <div className="relative xl:right-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                showUsers(e.target.value, selectedEstado);
              }}
              className="rounded-[10px] shadow-xl h-[30px] w-[100%] md:h-[50px] md:w-[400px] p-4 pl-12 bg-tertiary-100  xl:mr-6"
              placeholder="Search"
              required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
              <RiSearchLine className="h-8 w-8 p-1  rounded-md shadow-2xl text-green-500 font-semibold " />
            </div>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="table-auto w-full mt-6">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-green-500 text-white">#</th>
              <th className="px-4 py-2 bg-green-500 text-white">
                Fecha de registro
              </th>
              <th className="px-4 py-2 bg-green-500 text-white">Nombre</th>
              <th className="px-4 py-2 bg-green-500 text-white">Apellido</th>
              <th className="px-4 py-2 bg-green-500 text-white">Edad</th>
              <th className="px-4 py-2 bg-green-500 text-white">
                Tipo de identificación
              </th>
              <th className="px-4 py-2 bg-green-500 text-white">
                Número de identificación
              </th>
              <th className="px-4 py-2 bg-green-500 text-white">Teléfono</th>
              <th className="px-4 py-2 bg-green-500 text-white">
                Correo electrónico
              </th>
              <th className="px-4 py-2 bg-green-500 text-white">Rol</th>
              <th className="px-4 py-2 bg-green-500 text-white">Deporte</th>
              <th className="px-4 py-2 bg-green-500 text-white">
                Menor de edad
              </th>
              <th className="px-4 py-2 bg-green-500 text-white">Acudiente</th>
              <th className="px-4 py-2 bg-green-500 text-white">
                Teléfono acudiente
              </th>
              <th className="px-4 py-2 bg-green-500 text-white">
                Correo acudiente
              </th>
              <th className="px-4 py-2 bg-green-500 text-white">
                Estado
                <select
                  id="estado"
                  value={selectedEstado}
                  onChange={(e) => handleEstadoChange(e.target.value)}
                  className="p-1 rounded border border-gray-300 text-black"
                >
                  <option value="">Todos</option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </th>
              {userRole !== "estudiante" && (
                <th className="px-4 py-2 bg-green-500 text-white">Editar</th>
              )}
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">
                    {user.fecha_registro}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {editingUserId === user.id ? (
                      <input
                        type="text"
                        name="nombre"
                        value={editedUserData.nombre}
                        onChange={handleInputChange}
                        className="border px-2 py-1 w-full"
                        required
                      />
                    ) : (
                      user.nombre
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingUserId === user.id ? (
                      <input
                        type="text"
                        name="apellido"
                        value={editedUserData.apellido}
                        onChange={handleInputChange}
                        className="border px-2 py-1 w-full"
                        required
                      />
                    ) : (
                      user.apellido
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {editingUserId === user.id ? (
                      <input
                        type="number"
                        name="edad"
                        value={editedUserData.edad}
                        onChange={handleInputChange}
                        className="border px-2 py-1 w-full"
                        required
                      />
                    ) : (
                      user.edad
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {editingUserId === user.id ? (
                      <select
                        name="tipo_identificacion"
                        value={editedUserData.tipo_identificacion}
                        onChange={handleInputChange}
                        className="border px-2 py-1 w-full"
                        required
                      >
                        <option value="CC">CC</option>
                        <option value="TI">TI</option>
                      </select>
                    ) : (
                      user.tipo_identificacion
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {editingUserId === user.id ? (
                      <input
                        type="text"
                        name="identificacion"
                        value={editedUserData.identificacion}
                        onChange={handleInputChange}
                        className="border px-2 py-1 w-full"
                        required
                      />
                    ) : (
                      user.identificacion
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {editingUserId === user.id ? (
                      <input
                        type="text"
                        name="numero_celular"
                        value={editedUserData.numero_celular}
                        onChange={handleInputChange}
                        className="border px-2 py-1 w-full"
                        required
                      />
                    ) : (
                      user.numero_celular
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {editingUserId === user.id ? (
                      <input
                        type="email"
                        name="correo"
                        value={editedUserData.correo}
                        onChange={handleInputChange}
                        className="border px-2 py-1 w-full"
                        required
                      />
                    ) : (
                      user.correo
                    )}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {editingUserId === user.id ? (
                      <select
                        name="id_rol"
                        value={editedUserData.id_rol}
                        onChange={handleInputChange}
                        className="border px-2 py-1 w-full"
                        required
                      >
                        <option value="admin">admin</option>
                        <option value="profesor">profesor</option>
                        <option value="estudiante">estudiante</option>
                      </select>
                    ) : (
                      user.id_rol
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {editingUserId === user.id ? (
                      <input
                        disabled
                        type="text"
                        name="id_grupo"
                        value={editedUserData.id_grupo}
                        onChange={handleInputChange}
                        className="border px-2 py-1 w-full"
                        required
                      />
                    ) : (
                      user.id_grupo
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {editingUserId === user.id ? (
                      <select
                        name="es_menor_de_edad"
                        value={editedUserData.es_menor_de_edad ? "1" : "0"}
                        onChange={handleInputChange}
                        className="border px-2 py-1 w-full"
                        required
                      >
                        <option value="0">No</option>
                        <option value="1">Sí</option>
                      </select>
                    ) : user.es_menor_de_edad ? (
                      "Sí"
                    ) : (
                      "No"
                    )}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {editingUserId === user.id ? (
                      <input
                        type="text"
                        name="acudiente"
                        value={editedUserData.acudiente}
                        onChange={handleInputChange}
                        className="border px-2 py-1 w-full"
                        required
                      />
                    ) : (
                      user.acudiente
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {editingUserId === user.id ? (
                      <input
                        type="text"
                        name="telefono_acudiente"
                        value={editedUserData.telefono_acudiente}
                        onChange={handleInputChange}
                        className="border px-2 py-1 w-full"
                        required
                      />
                    ) : (
                      user.telefono_acudiente
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {editingUserId === user.id ? (
                      <input
                        type="email"
                        name="correo_acudiente"
                        value={editedUserData.correo_acudiente}
                        onChange={handleInputChange}
                        className="border px-2 py-1 w-full"
                        required
                      />
                    ) : (
                      user.correo_acudiente
                    )}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {editingUserId === user.id ? (
                      <select
                        name="estado"
                        value={editedUserData.estado}
                        onChange={handleInputChange}
                        className="border px-2 py-1 w-full"
                        required
                      >
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                      </select>
                    ) : (
                      user.estado
                    )}
                  </td>
                  {userRole !== "estudiante" && (
                    <td className="border px-4 py-2 text-center">
                      {editingUserId === user.id ? (
                        <button
                          onClick={handleUpdate}
                          className="flex justify-center items-center gap-2 xl:gap-2 px-2 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#78fb71] via-[#55e11d] to-[#12be1b] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be1b] hover:to-[#78fb71]"
                        >
                          <RiCheckFill className="h-6 w-6" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(user)}
                          className="flex justify-center items-center gap-2 xl:gap-2 px-3 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#7f71fb] via-[#2a1de1] to-[#2312be] hover:shadow-xl hover:shadow-blue-500 hover:scale-105 duration-300 hover:from-[#2312be] hover:to-[#7a71fb]"
                        >
                          <RiEdit2Fill />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default VerUsuario;
