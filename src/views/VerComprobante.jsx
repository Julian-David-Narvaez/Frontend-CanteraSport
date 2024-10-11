import { useState, useEffect } from "react";
import useListComprobantes from "../hooks/Listar/useListComprobantes";
import { RiDeleteBin5Fill } from "react-icons/ri";
import useDeleteComprobante from "../hooks/Eliminar/useDeleteComprobante";

const FacturaList = () => {
  const {
    deleteComprobante,
    loading: loadingDelete,
    error: errorDelete,
  } = useDeleteComprobante();
  const { facturas, loading, error } = useListComprobantes();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFactura, setSelectedFactura] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const openModal = (factura) => {
    setSelectedFactura(factura);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFactura(null);
    setModalOpen(false);
  };
  useEffect(() => {
    const role = localStorage.getItem("role");

    setUserRole(role);
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  const handleDelete = async (id) => {
    await deleteComprobante(id);
  };

  return (
    <>
      <h2 className="text-4xl md:text-7xl font-extrabold text-center text-green-500 mb-10 tracking-wider animate-pulse drop-shadow-lg">
        {" "}
        ¡COMPROBANTES PENDIENTES!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {facturas.length === 0 ? (
          <p>No hay facturas disponibles</p>
        ) : (
          facturas.map((factura) => (
            <div
              key={factura.id}
              className="bg-white rounded-lg shadow-md transform transition-transform duration-500 hover:scale-105"
            >
              <section className="bg-green-200 rounded-t-lg p-6 text-gray-800 text-sm">
                <img
                  className="w-full h-48 object-cover rounded-t-lg"
                  src={`data:image/jpeg;base64,${factura.comprobante_pago_base64}`}
                  alt={`Comprobante de ${factura.titulo}`}
                />
              </section>

              <footer className="flex flex-col p-4 font-bold text-sm text-gray-800">
                <div className="flex justify-between ">
                  <div className="mb-4  w-full">
                    <p className="text-lg text-center">{factura.titulo}</p>
                    <p className="font-semibold text-center">
                      {factura.descripcion}
                    </p>
                  </div>
                  {userRole !== "estudiante" && (
                    <div className="grid justify-end items-center">
                      <button
                        className="flex justify-center items-center mr-2 gap-2 w-8 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                        onClick={() => handleDelete(factura.id)}
                      >
                        <RiDeleteBin5Fill />
                      </button>
                    </div>
                  )}
                  {loadingDelete && <div>Eliminando...</div>}
                  {errorDelete && (
                    <div className="text-red-500">{errorDelete}</div>
                  )}
                </div>
                <button
                  onClick={() => openModal(factura)}
                  className="w-full py-2 rounded-lg bg-green-400 text-white text-center font-medium"
                >
                  Visualizar
                </button>
              </footer>
            </div>
          ))
        )}

        {isModalOpen && selectedFactura && (
          <div className="fixed inset-0 flex items-center backdrop-blur-sm justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-4 w-96">
              <img
                className="w-full h-auto object-contain"
                src={`data:image/jpeg;base64,${selectedFactura.comprobante_pago_base64}`}
                alt={`Comprobante de ${selectedFactura.titulo}`}
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={closeModal}
                  className="py-2 px-4 rounded-lg bg-red-400 text-white font-medium"
                >
                  Regresar
                </button>
                <button className="py-2 px-4 rounded-lg bg-green-400 text-white font-medium">
                  Validar Pago
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FacturaList;
