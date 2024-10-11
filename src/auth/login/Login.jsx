import {
  RiUserLine,
  RiEyeOffLine,
  RiEyeLine,
  RiLockPasswordLine,
  RiFacebookCircleFill,
  RiWhatsappFill,
  RiInstagramFill,
  RiErrorWarningFill,
} from "react-icons/ri";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";

import AlertTitle from "@mui/material/AlertTitle";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        correo: email,
        password: password,
      });

      if (response.status !== 200) {
        throw new Error(
          "No se pudo iniciar sesión. Usuario o contraseña incorrectos."
        );
      }

      const { accessToken, role } = response.data; 
      window.localStorage.setItem("token", accessToken);
      window.localStorage.setItem("role", role);
     
      
      setEmail("");
      setPassword("");
      setError("");

      navigate("/deportes");
    } catch (error) {
      setError(
        error.response?.data?.message || "Usuario o contraseña incorrectos."
      );
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: "url('../../../src/assets/img/deportesfondo.webp')",
      }}
    >
      <div className="xl:ml-[35%] absolute top-20 text-black text-4xl font-bold">
        Cantera Sport Fc
      </div>

      <div className="bg-blue-700/30 p-8 rounded-3xl shadow-lg md:w-full max-w-md mt-16 xl:ml-[35%]">
        <h2 className="text-xl font-bold mb-6 text-black text-center xl:text-start ">INICIO DE SESIÓN</h2>
        {error && (
          <Alert
            className=""
            icon={<RiErrorWarningFill className="mt-3" fontSize="inherit" />}
            severity="error"
            variant="filled"
          >
            <AlertTitle>Error</AlertTitle>
            Usuario y Contraseña incorrectos
          </Alert>
        )}
        <form onSubmit={handleLogin}>
          <label
            htmlFor="email"
            className="block xl:text-gray-700 text-md font-bold mb-1"
          >
            Usuario
          </label>
          <div className="text-center">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 pl-12 bg-gray-100 text-black rounded-md"
                required
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <RiUserLine className="text-[#FF432A]" />
              </div>
            </div>
          </div>
          <label
            htmlFor="password"
            className="block xl:text-gray-700 text-md font-bold mt-4"
          >
            Contraseña
          </label>
          <div className="text-center mt-1">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full p-2 pl-12 bg-gray-100 text-black rounded-md"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {showPassword ? (
                  <RiEyeOffLine
                    className="text-blue-500 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <RiEyeLine
                    className="text-blue-500 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <RiLockPasswordLine className="text-blue-500" />
              </div>
            </div>
          </div>

          <div className="mt-4 md:flex grid justify-center md:justify-between">
            <label className="text-black flex items-center font-bold">
              <input
                className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-6 h-6"
                type="checkbox"
              />
              <h3 className="ml-2 text-sm">Recordar Usuario</h3>
            </label>
            <Link
              to="/olvidarcontraseña"
              className="text-black text-sm font-bold"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <div className="flex items-center justify-center xl:justify-end mt-4">
            <button
              className="flex items-center gap-4 px-4 py-3 cursor-pointer rounded-br-3xl rounded-tl-3xl shadow-2xl text-white font-bold bg-gradient-to-r from-secundary via-[#457ded] to-[#123abb] hover:shadow-xl hover:shadow-secundary hover:scale-105 duration-300 hover:from-secundary hover:to-[#042cb3]"
              type="submit"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center mt-8 text-black space-x-6 xl:ml-[35%]">
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
    </div>
  );
};

export default Login;
