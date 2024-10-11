import { useState } from "react";
import axios from "axios";
import { Alert, AlertTitle } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import { RiErrorWarningFill, RiEyeOffFill, RiEyeFill } from "react-icons/ri";
import useListDeportes from "../hooks/Listar/useListDeportes";
const CrearUsuario = () => {
  const initialState = {
    nombre: "",
    apellido: "",
    edad: "",
    tipo_identificacion: "",
    identificacion: "",
    numero_celular: "",
    correo: "",
    password: "",
    id_rol: "",
    id_grupo: "",
    es_menor_de_edad: "1",
    acudiente: "",
    telefono_acudiente: "",
    correo_acudiente: "",
    estado: "activo",
  };

  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [celular, setCelular] = useState("");
  const [cedula, setCedula] = useState("");
  const { deportes, loading, error } = useListDeportes();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "numero_celular") {
      const phoneNumber = value.replace(/\D/g, "");
      if (phoneNumber.length <= 10) {
        setFormData({
          ...formData,
          [name]: phoneNumber,
        });
        setCelular(phoneNumber);
      }
    } else if (name === "identificacion") {
      const cleanedValue = value.replace(/\D/g, "");
      if (cleanedValue.length <= 10) {
        setFormData({
          ...formData,
          [name]: cleanedValue,
        });
        setCedula(cleanedValue);
      }
    } else if (name === "edad") {
      const edad = parseInt(value, 10);
      const cleanedValue = value.replace(/\D/g, "");

      setFormData({
        ...formData,
        [name]: cleanedValue,
        es_menor_de_edad: edad < 18 ? "1" : "0",
        menorEdad: edad < 18 ? "SI" : "NO",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData,
        config
      );
  
      setFormData(initialState); 
  
     
      setAlertSeverity("success");
      setAlertMessage(response.data.message); 
      setOpen(true);
    } catch (error) {
      let errorMessage = "Error inesperado."; 
  
     
      if (error.response && error.response.data) {
        
        const errorData = error.response.data.error;
        
        if (errorData) {
          
          const messages = Object.values(errorData).flat(); 
          errorMessage = messages.join(", "); 
        } else {
         
          errorMessage = error.response.data.message || "Error en el registro."; 
        }
      } else if (error.message) {
      
        errorMessage = error.message;
      }
  
      setAlertSeverity("error");
      setAlertMessage(errorMessage); 
      setOpen(true);
      console.error("Error al crear usuario:", errorMessage); 
    }
  };
  
  
  

  if (loading) {
    return <p>Cargando deportes...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  const isJugador = formData.id_rol === "estudiante";
  const isMenorEdad = formData.es_menor_de_edad === "1";
  return (
    <div className="flex justify-center items-center  ">
      <div className="  md:p-10 xl:w-[50%] w-[100%]">
        <form
          onSubmit={handleSubmit}
          className=" shadow-xl shadow-green-700 rounded-2xl py-10 bg-tertiary-100 px-[20%] "
        >
          <div className="flex justify-center">
            <img
              src="../src/assets/img/futbol.png"
              className="w-full h-full object-cover rounded-3xl"
              alt="background"
            />
          </div>
          <h4 className="text-center text-green-500 text-2xl font-bold py-8">
            Registro de Usuario Nuevo
          </h4>

          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-green-500 text-sm font-bold mb-2"
            >
              Nombre:
            </label>
            <input
              type="text"
              name="nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
              className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:border-green-500  placeholder-black placeholder-opacity-70"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="apellido"
              className="block text-green-500 text-sm font-bold mb-2"
            >
              Apellido:
            </label>

            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:border-green-500  placeholder-black placeholder-opacity-70"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="apellido"
              className="block text-green-500 text-sm font-bold mb-2"
            >
              Edad:
            </label>

            <input
              type="text"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:border-green-500  placeholder-black placeholder-opacity-70"
              required
            />
          </div>

          <div className="flex justify-between items-center ">
            <div className="">
              <select
                name="tipo_identificacion"
                value={formData.tipo_identificacion}
                onChange={handleChange}
                className="py-2 text-green-500 w-full rounded-md border border-gray-300"
              >
                <option value="">TIPO</option>
                <option value="CC">CC</option>
                <option value="TI">TI</option>
              </select>
            </div>
            <div className="w-[70%]">
              <label
                htmlFor="identificacion"
                className="block text-green-500 text-sm font-bold mb-2"
              >
                # Identificacion:
              </label>
              <input
                disabled={!formData.tipo_identificacion}
                type="text"
                name="identificacion"
                value={formData.identificacion}
                onChange={handleChange}
                className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:border-green-500  placeholder-black placeholder-opacity-70"
                required
              />
              <div className="grid justify-end text-green-500">
                {cedula.length}/10
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="numero_celular"
              className="block text-green-500 text-sm font-bold mb-2"
            >
              Teléfono:
            </label>
            <input
              type="text"
              name="numero_celular"
              value={formData.numero_celular}
              onChange={handleChange}
              className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:border-green-500  placeholder-black placeholder-opacity-70"
              required
            />
            <div className="grid justify-end text-green-500">
              {celular.length}/10
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="correo"
              className="block text-green-500 text-sm font-bold mb-2"
            >
              Correo electrónico:
            </label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:border-green-500  placeholder-black placeholder-opacity-70"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-green-500 text-sm font-bold mb-2"
            >
              Contraseña:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:border-green-500  placeholder-black placeholder-opacity-70"
                required
              />
              <div className="absolute inset-y-0  right-0 flex items-center pr-2">
                {showPassword ? (
                  <RiEyeOffFill
                    className=" cursor-pointer text-green-500"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <RiEyeFill
                    className=" cursor-pointer text-green-500"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-green-500 text-sm font-bold mb-2"
            >
              Rol:
            </label>
            <select
              name="id_rol"
              value={formData.id_rol}
              onChange={handleChange}
              className="py-2 text-green-500 w-full rounded-md"
            >
              <option value="">SELECCIONE UN ROL</option>
              <option value="admin">ADMIN</option>
              <option value="profesor">ENTRENADOR</option>
              <option value="estudiante">JUGADOR</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-green-500 text-sm font-bold mb-2"
            >
              Deporte:
            </label>
            <select
              name="id_grupo"
              value={formData.id_grupo}
              onChange={handleChange}
              className="py-2 text-green-500 w-full rounded-md"
            >
              <option value="">SELECCIONE UN DEPORTE</option>
              {deportes.map((deporte, index) => (
                <option key={index} value={deporte.id}>
                  {deporte.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="menorEdad"
              className="block text-green-500 text-sm font-bold mb-2"
            >
              Menor Edad:
            </label>
            <input
              type="text"
              name="menorEdad"
              value={formData.menorEdad}
              readOnly
              className="border-b px-2 border-black text-green-500 py-1 bg-tertiary-100 w-full focus:outline-none"
            />
          </div>
          {isJugador && isMenorEdad && (
            <>
          <div className="mb-4">
            <label
              htmlFor="acudiente"
              className="block text-green-500 text-sm font-bold mb-2"
            >
              Nombre acudiente:
            </label>
            <input
              type="text"
              name="acudiente"
              required
              value={formData.acudiente}
              onChange={handleChange}
              className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:border-green-500  placeholder-black placeholder-opacity-70"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="telefono_acudiente"
              className="block text-green-500 text-sm font-bold mb-2"
            >
              Telefono acudiente:
            </label>
            <input
              type="text"
              name="telefono_acudiente"
              required
              value={formData.telefono_acudiente}
              onChange={handleChange}
              className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:border-green-500  placeholder-black placeholder-opacity-70"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="correo_acudiente"
              className="block text-green-500 text-sm font-bold mb-2"
            >
              Correo electrónico acudiente:
            </label>
            <input
              type="email"
              name="correo_acudiente"
              value={formData.correo_acudiente}
              onChange={handleChange}
              className="border-b px-2 border-black text-black py-1 bg-tertiary-100 w-full focus:outline-none focus:border-green-500  placeholder-black placeholder-opacity-70"
              required
            />
          </div>
          </>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-green-500 text-sm font-bold mb-2"
            >
              Estado:
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="py-2 text-green-500 w-full rounded-md"
            >
              <option value="activo">ACTIVO</option>
              <option value="inactivo">INACTIVO</option>
            </select>
          </div>

          <>
          <button
  type="submit"
  className="flex justify-center items-center gap-2 px-3 py-2 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#71fb83] via-[#3ee11d] to-[#18be12] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#23be12] hover:to-[#83fb71]"
>
  Guardar Usuario
</button>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {alertSeverity === "success" ? "Éxito" : "Error"}
              </DialogTitle>
              <DialogContent>
                <Alert severity={alertSeverity} icon={<RiErrorWarningFill />}>
                  <AlertTitle>
                    {alertSeverity === "success"
                      ? "Usuario registrado exitosamente"
                      : "Error al registrar el usuario"}
                  </AlertTitle>
                  {alertMessage}
                </Alert>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cerrar</Button>
              </DialogActions>
            </Dialog>
          </>
        </form>
      </div>
    </div>
  );
};

export default CrearUsuario;
