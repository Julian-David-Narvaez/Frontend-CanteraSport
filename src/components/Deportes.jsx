import { useState, useEffect } from "react";
import {
  RiFacebookCircleFill,
  RiWhatsappFill,
  RiInstagramFill,
  RiAddCircleFill,
  RiMore2Fill,
  RiDeleteBin6Fill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import useListDeportes from "../hooks/Listar/useListDeportes";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";

const Deportes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deporte, setDeporte] = useState({ nombre: "", image: "" });
  const [imagenesOcupadas, setImagenesOcupadas] = useState([]);
  const { deportes } = useListDeportes();
  const [userRole, setUserRole] = useState(null);
  
  
  const imagenesPredefinidas = [
    {
      label: "Fútbol",
      value:
        "https://img.freepik.com/foto-gratis/futbol-concepto-exito-meta_1150-5276.jpg",
    },
    {
      label: "Patinaje",
      value:
        "https://img.freepik.com/foto-gratis/vista-lateral-desenfocada-palas-rodillos_23-2148382754.jpg?t=st=1726491821~exp=1726495421~hmac=9affd0256c7faddb69a029f08c17352f4aa759ccdf8d1cfcb76c30e9765f7b40&w=996",
    },
    {
      label: "Baloncesto",
      value:
        "https://img.freepik.com/foto-gratis/retrato-cuerpo-entero-jugador-baloncesto-pelota_155003-1374.jpg?t=st=1726492159~exp=1726495759~hmac=eec820460fa6fde0210eefe5353a545ffa1661e7fe6d005810fdce7a429eaf60&w=900",
    },
    {
      label: "Boxeo",
      value:
        "https://img.freepik.com/foto-gratis/dos-boxeadores-musculosos-compiten-ring-llevan-cascos-guantes_613910-6106.jpg?t=st=1727706000~exp=1727709600~hmac=a7af3e9cc8baf683e27b61b677b2e8c4629ea102118554d98dff9fe20ea847fa&w=826",
    },
    {
      label: "Natación",
      value:
        "https://img.freepik.com/foto-gratis/nadador-masculino-nadando-trazo-mariposa_171337-7613.jpg?t=st=1727706212~exp=1727709812~hmac=19cfee393fee62d3520a8b3fe1fb6dcafaab887bdf53d4fa7abec27bc68980fa&w=996"
    },
    {
      label: "Voleibol",
      value:
        "https://img.freepik.com/foto-gratis/jugadoras-profesionales-voleibol-accion-estadio-3d_654080-1089.jpg?t=st=1727706277~exp=1727709877~hmac=27470bb519a68e7b3a886da39cf6e2b82c6afe36e0f680024968176d72560c07&w=1060"
    },
    {
      label: "Tenis",
      value:
        "https://img.freepik.com/foto-gratis/vista-raqueta-tenis-golpeando-pelota_23-2151378486.jpg?t=st=1727706321~exp=1727709921~hmac=0eb06f1de3ef0c6ce6f7577b7be6e991a81248b1910c6ce6abcb877822b73d7e&w=1060"
    },
    {
      label: "Karate",
      value:
        "https://img.freepik.com/foto-gratis/hombre-kimono-blanco-entrenando-karate_155003-314.jpg?t=st=1727706437~exp=1727710037~hmac=ee1738aa450f7c1ffb85a810592667530867a75d2c353dc982091a6a6bf4778c&w=996"
    },
    {
      label: "Gimnasia",
      value:
        "https://img.freepik.com/foto-gratis/persona-atletica-haciendo-ejercicio-entrenando_23-2150990067.jpg?t=st=1727706469~exp=1727710069~hmac=5bc329dfa51aea3f8f225d1e1e26e413fffa4aadd161f2452d9aeeb5b6ec0048&w=740"
    },
    
    
    
    
   

  ];
const getDeporteStyles = (nombre) => {
    switch (nombre) {
      case "Fútbol":
        return { bgColor: "bg-green-500", shadowColor: "shadow-green-500" };
      case "Patinaje":
        return { bgColor: "bg-gray-500", shadowColor: "shadow-gray-500" };
      case "Baloncesto":
        return { bgColor: "bg-orange-500", shadowColor: "shadow-orange-500" };
      case "Boxeo":
        return { bgColor: "bg-red-500", shadowColor: "shadow-red-500" };
      case "Natación":
        return { bgColor: "bg-blue-500", shadowColor: "shadow-blue-500" };
      case "Voleibol":
        return { bgColor: "bg-yellow-500", shadowColor: "shadow-yellow-500" };
      case "Tenis":
        return { bgColor: "bg-green-800", shadowColor: "shadow-green-800" };
      case "Karate":
        return { bgColor: "bg-black", shadowColor: "shadow-black" };
      case "Gimnasia":
        return { bgColor: "bg-blue-800", shadowColor: "shadow-blue-800" };

      default:
        return { bgColor: "bg-gray-500", shadowColor: "shadow-gray-500" };
    }
  };
 
  useEffect(() => {
    const role = localStorage.getItem('role');
    
    setUserRole(role);

    const ocupadas = deportes.map((deporte) => deporte.image_url);
    setImagenesOcupadas(ocupadas);
  }, [deportes]);

  const handleImageSelect = (imgLabel, imgValue) => {
    if (!imagenesOcupadas.includes(imgValue)) {
      setDeporte({ ...deporte, nombre: imgLabel, image: imgValue });
    }
  };

  const handleChange = (e) => {
    setDeporte({ ...deporte, nombre: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deporte.nombre || !deporte.image) return;

    const formData = new FormData();
    formData.append("nombre", deporte.nombre);
    formData.append("image_url", deporte.image);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/addSport", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Deporte agregado exitosamente");
        setDeporte({ nombre: "", image: "" });
        setIsModalOpen(false);
        
        window.location.reload();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al agregar deporte:", error);
      alert("Error al agregar deporte");
    }
  };

  const handleDelete = async (id, imgValue) => {
    if (!id) {
      console.error('ID del deporte no proporcionado.');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        
        setImagenesOcupadas(imagenesOcupadas.filter((img) => img !== imgValue));
        alert("Deporte eliminado exitosamente");
          window.location.reload();
        
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error al eliminar deporte:', error);
      alert('Error al eliminar deporte');
    }
  };

  return (
    <div className="relative min-h-screen bg-no-repeat bg-cover bg-center">
      {userRole === 'admin' && (
      <div className="flex absolute top-4 right-40">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-black px-4 py-4 rounded"
        >
          <RiAddCircleFill className="h-10 w-10" />
        </button>
      </div>
      )}
      <div className="text-black text-4xl font-bold mt-16 text-center">
        <h1>Bienvenido a Cantera Sport</h1>
        <h2 className="text-xl">Selecciona el Deporte</h2>
      </div>

      <div className="flex flex-wrap justify-center mt-8">
        {deportes.map((deporte) => {
          const { bgColor, shadowColor } = getDeporteStyles(deporte.nombre);

          return (
            <div key={deporte.id} className="relative mx-4 my-4">
              <Link
  to={`/`}
  className={`${bgColor} shadow-xl grid hover:scale-110 h-full duration-300 hover:shadow-2xl ${shadowColor} rounded-3xl max-w-sm`}
>
  <div className="w-80 h-64 overflow-hidden rounded-t-3xl"> 
    <img
      src={deporte.image_url}
      className="w-full h-full object-cover"
      alt={deporte.nombre}
    />
  </div>
  <h2 className="text-2xl font-bold my-4 text-white text-center">
    {deporte.nombre.toUpperCase()}
  </h2>
</Link>

              {userRole === 'admin' && (
              <Menu
                menuButton={
                  <MenuButton className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-200">
                    <RiMore2Fill className="h-6 w-6 text-gray-700" />
                  </MenuButton>
                }
                transition
                menuClassName="p-1 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem
                  onClick={() => handleDelete(deporte.id, deporte.image_url)}
                  className="flex items-center px-4 py-2 text-red-600 hover:bg-red-100 rounded-t-lg"
                >
                  <RiDeleteBin6Fill className="h-5 w-5 mr-2" />
                  Eliminar
                </MenuItem>
              </Menu>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center mt-8 text-black space-x-6">
        <a href="https://wa.link/ymmjo3">
          <RiWhatsappFill className="text-3xl cursor-pointer" target="BLANK" />
        </a>
        <a href="" target="BLANK">
          <RiInstagramFill className="text-3xl cursor-pointer" />
        </a>
        <a
          href="https://www.facebook.com/p/Cantera-Sport-100065125894411/?paipv=0&eav=AfY_dTnGFzynOUlNvpSCT1iKVBXdp8g3E5fNsletTDjE364B5dffWIrmsWnuKxMECn0&_rdr"
          target="BLANK"
        >
          <RiFacebookCircleFill className="text-3xl cursor-pointer" />
        </a>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Agregar Deporte</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Deporte
                </label>
                <input
                  type="text"
                  disabled
                  value={deporte.nombre}
                  onChange={handleChange}
                  className="border rounded-lg px-4 py-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Seleccionar Imagen
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {imagenesPredefinidas.map((img) => (
                    <div
                      key={img.value}
                      onClick={() => handleImageSelect(img.label, img.value)}
                      className={`cursor-pointer border-2 p-2 rounded-lg ${
                        imagenesOcupadas.includes(img.value)
                          ? "border-gray-500 cursor-not-allowed"
                          : deporte.image === img.value
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={img.value}
                        alt={img.label}
                        className="object-cover h-20 w-20 rounded-md"
                      />
                      <p className="text-center mt-2 text-sm">{img.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex mb-2  items-center  gap-4 px-4 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-red-500 via-[#ed4545] to-[#bb1212] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-red-500 hover:to-[#b30404]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex mb-2  items-center  gap-4 px-4 py-3 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-blue-500 via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-blue-500 hover:scale-105 duration-300 hover:from-blue-500 hover:to-[#042cb3]"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deportes;

