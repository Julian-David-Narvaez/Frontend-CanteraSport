import { useState } from "react";
import useAddComprobante from "../hooks/Agregar Comprobantes/useAddComprobante";

const ComprobanteForm = () => {
  const { addComprobante, loading, error } = useAddComprobante();
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    comprobante_pago: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      comprobante_pago: file,
    });

    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreview(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addComprobante(formData);
  };

  return (
    <>
      <div className="w-11/12 max-w-md mx-auto my-2 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2 className="font-bold text-3xl text-center mb-12 text-green-400">
              Subir reporte de pago
            </h2>

            <div className="flex flex-col max-w-[240px]">
              <div className="grid">
                <label
                  htmlFor="descripcion"
                  className="text-green-400 text-xl font-semibold"
                >
                  Titulo
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  required
                  className="p-2 text-xs border-2 border-gray-400 rounded focus:outline-none w-full mb-4"
                />
                <label
                  htmlFor="descripcion"
                  className="text-green-400 text-xl font-semibold"
                >
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                  className="p-2 text-xs border-2 border-gray-400 rounded focus:outline-none w-full mb-4 "
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <label
                htmlFor="comprobante_pago"
                className="mt-5 bg-transparent p-2 w-full flex flex-col items-center border-dashed border-2 border-gray-500 hover:border-solid hover:border-green-500 focus:border-solid focus:border-green-500 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 340.531 419.116"
                  className="fill-green-500 transform hover:scale-125 transition-transform duration-300"
                ></svg>
                <span hidden={preview} className="mt-4 font-bold text-gray-400 text-center">
                  Arrastre el soporte de pago aquí para cargarlos.
                </span>
                {preview && (
                  <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden">
                    <img
                      src={preview}
                      alt="Vista previa"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                <br />
                <strong className="text-green-500 font-bold">Click aquí</strong>
              </label>

              <input
                type="file"
                id="comprobante_pago"
                name="comprobante_pago"
                onChange={handleFileChange}
                required
                className="hidden"
              />
            </div>
          </div>

          <div className="p-6 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="ml-3 py-2 px-4 font-medium border border-green-500 rounded bg-green-500 text-white hover:bg-green-600"
            >
              {loading ? "Cargando..." : "Subir Comprobante"}
            </button>
          </div>
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </form>
      </div>
    </>
  );
};

export default ComprobanteForm;
