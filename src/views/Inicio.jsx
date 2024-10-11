import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useAddNoticias from "../hooks/AgregarNoticias/useAddNoticias";
import useListNoticias from "../hooks/Listar/useListNoticias";
import { RiDeleteBin5Fill } from "react-icons/ri";
import useDeleteNotice from "../hooks/Eliminar/useDeleteNotice";

const Inicio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { addNotice, loading: loadingAdd, error: errorAdd } = useAddNoticias();
  const { notices } = useListNoticias();
  const [userRole, setUserRole] = useState(null);
  const [preview, setPreview] = useState(null);
  const [newEvent, setNewEvent] = useState({
    titulo: "",
    descripcion: "",
    image_url: "",
  });
  const {
    deleteNotice,
    loading: loadingDelete,
    error: errorDelete,
  } = useDeleteNotice();

  const handleDelete = async (id) => {
    await deleteNotice(id);
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const teamMembers = [
    {
      id: 1,
      name: "Holden Caulfield",
      role: "ENTRENADOR CATEGORIA SUB 18",
      description:
        "Bolsa de mano DIY para beber vinagre, cronut, adaptógeno, calamar, riñonera, vaporware.",
      imageUrl: "../../src/assets/ImgInicio/Carleto.jpg",
    },
    {
      id: 2,
      name: "Alper Kamu",
      role: "ENTRENADOR CATEGORIA SUB 15",
      description:
        "Bolsa de mano DIY para beber vinagre, cronut, adaptógeno, calamar, riñonera, vaporware.",
      imageUrl: "../../src/assets/ImgInicio/Pep.jpg",
    },
    {
      id: 3,
      name: "Pinzón ático",
      role: "ENTRENADOR CATEGORIA INFANTIL",
      description:
        "Bolsa de mano DIY para beber vinagre, cronut, adaptógeno, calamar, riñonera, vaporware.",
      imageUrl: "../../src/assets/ImgInicio/Zizu.jpg",
    },
    {
      id: 4,
      name: "Henry Letham",
      role: "ENTRENADOR CATEGORIA PONY",
      description:
        "Bolsa de mano DIY para beber vinagre, cronut, adaptógeno, calamar, riñonera, vaporware.",
      imageUrl: "../../src/assets/ImgInicio/Mou.jpg",
    },
  ];

  const carouselImages = [
    "../../src/assets/ImgInicio/caru1.jpg",
    "../../src/assets/ImgInicio/Caru1.jpg",
    "../../src/assets/ImgInicio/caru1.jpg",
    "../../src/assets/ImgInicio/caru4.jpg",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleConfirm = async () => {
    await addNotice(newEvent); 
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewEvent({
      ...newEvent,
      image_url: file,
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

  useEffect(() => {
    const role = localStorage.getItem("role");

    setUserRole(role);
  }, []);

  return (
    <div className="flex h-screen ">
      <div
        className="flex-3  p-4 overflow-y-scroll w-[100%] mx-auto"
        style={{ backgroundImage: "url('/Fondo.jpg')" }}
      >
        <h2 className="text-4xl md:text-7xl font-extrabold text-center text-green-500 mb-10 tracking-wider animate-pulse drop-shadow-lg">
          {" "}
          ¡BIENVENIDO CANTERANO!
        </h2>

        <div className="relative w-full mb-10 max-w-4xl mx-auto drop-shadow-2xl">
          <div className="overflow-hidden w-full h-full rounded-lg">
            <img
              src={carouselImages[currentSlide]}
              alt={`Imagen ${currentSlide + 1}`}
              className="w-full h-full object-cover rounded-lg transition-transform duration-500 ease-in-out "
            />
          </div>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full hover:bg-gray-900 focus:outline-none"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full hover:bg-gray-900 focus:outline-none"
          >
            &#10095;
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {carouselImages.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? "bg-gray-800" : "bg-gray-400"
                }`}
              ></div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notices.map((notice) => (
        <div
          key={notice.id}
          className="bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 p-4"
        >
          
          <img
          src={`data:image/jpeg;base64,${notice.image_url_base64}`}
          alt= {notice.titulo}
            
            className="w-full h-48 object-cover rounded-t-lg"
          />
      
          <h3 className="text-lg font-semibold mt-2 mb-4 text-center">
            {notice.titulo}
          </h3>
       
          <p className="text-gray-600 text-justify break-words">
            {notice.descripcion}
          </p>

     
          {userRole !== "estudiante" && (
            <div className="grid justify-end items-center">
              <button
                className="flex justify-center items-center mr-2 gap-2 w-8 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                onClick={() => handleDelete(notice.id)}
              >
                <RiDeleteBin5Fill />
              </button>
            </div>
          )}
        </div>
      ))}
      {loadingDelete && <div>Eliminando...</div>}
      {errorDelete && <div className="text-red-500">{errorDelete}</div>}
    </div>

        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">
              NUESTROS ENTRENADORES
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Un buen entrenador de fútbol es un líder nato que combina
              conocimientos técnicos, habilidades pedagógicas y una gran
              capacidad para motivar a su equipo.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="p-4 lg:w-1/2">
                <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                  <img
                    alt={member.name}
                    className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                    src={member.imageUrl}
                  />
                  <div className="flex-grow sm:pl-8">
                    <h2 className="title-font font-medium text-lg text-gray-900">
                      {member.name}
                    </h2>
                    <h3 className="text-gray-500 mb-3 ">{member.role}</h3>
                    <p className="mb-4">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative h-[100%] bg-gray-100">
        {isVisible && (
          <div className="bg-white rounded-lg shadow-md p-6 w-80 h-full overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800">Noticia</h2>
              <button
                className="bg-green-300 p-2 rounded-full flex items-center justify-center"
                onClick={() => setShowModal(true)}
                disabled={loadingAdd}
              >
                {loadingAdd ? (
                  <svg
                    className="animate-spin w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                )}
              </button>
              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      ¿Está seguro de subir la noticia o desea cambiar alguna
                      información?
                    </h2>
                    <div className="flex space-x-4">
                      <button
                        onClick={handleConfirm}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        disabled={loadingAdd}
                      >
                        {loadingAdd ? "Subiendo..." : "Confirmar"}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Atrás
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto space-y-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Título de la noticia:</span>
                </div>
                <input
                  type="text"
                  name="titulo"
                  className="border border-gray-300 rounded-lg p-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Escribe el título de la noticia aquí..."
                  value={newEvent.titulo}
                  onChange={handleInputChange}
                  disabled={loadingAdd}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">
                    Descripción de la noticia:
                  </span>
                </div>
                <textarea
                  name="descripcion"
                  className="border border-gray-300 rounded-lg p-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Escribe aquí la descripción del evento o noticia..."
                  value={newEvent.descripcion}
                  onChange={handleInputChange}
                  disabled={loadingAdd}
                ></textarea>
              </div>

              <div className="flex flex-col items-center">
              <label
                htmlFor="image_url"
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
                  Sube tu imagen de la noticia aquí para cargarlos.
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
                id="image_url"
                name="image_url"
                onChange={handleFileChange}
                required
                className="hidden"
              />
            </div>

              {errorAdd && <div className="text-red-600">{errorAdd}</div>}
            </div>
          </div>
        )}
        {userRole !== "estudiante" && (
          <button
            onClick={toggleVisibility}
            className="absolute bottom-4 right-4 bg-gray-400 hover:bg-gray-600 text-white p-2 rounded-full focus:outline-none"
          >
            {isVisible ? <FaArrowRight /> : <FaArrowLeft />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Inicio;
