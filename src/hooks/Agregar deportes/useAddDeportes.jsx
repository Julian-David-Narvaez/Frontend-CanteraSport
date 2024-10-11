import { useState } from 'react';
import useAuthToken from '../../../../landing_page_react/src/views/hook/Token/useAuthToken';
const useAddDeportes = () => {
  const [sportName, setSportName] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [token] = useAuthToken();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const predefinedImages = [
    '../../assets/img/futbol.jpg.webp',
    '../../assets/img/baloncesto.jpg',
    '../../assets/img/patinaje.jpeg',
  ];

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleAddDeporte = async () => {
    const formData = new FormData();
    formData.append('nombre', sportName);
    formData.append('image_path', selectedImage);

    try {
      await fetch('http://127.0.0.1:8000/api/image/addSport', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        body: formData,
      });

      alert('Deporte agregado correctamente!'); 
      
      closeModal(); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const AddDeportesModal = () => (
    isModalOpen ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-lg w-1/3">
          <h2 className="text-xl mb-4">Agregar Deporte</h2>
          <input
            type="text"
            value={sportName}
            onChange={(e) => setSportName(e.target.value)}
            placeholder="Nombre del deporte"
            className="border px-4 py-2 mb-4 w-full"
          />
          <div className="mb-4">
            {predefinedImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Deporte ${index}`}
                className={`w-24 h-24 m-2 cursor-pointer ${selectedImage === image ? 'border-4 border-blue-500' : ''}`}
                onClick={() => handleImageSelect(image)}
              />
            ))}
          </div>
          <button
            onClick={handleAddDeporte}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Agregar
          </button>
          <button
            onClick={closeModal}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    ) : null
  );

  return {openModal,AddDeportesModal}
};

export default useAddDeportes;
