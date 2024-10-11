import {
  RiHomeLine,
  RiCalendar2Fill,
  RiFootballFill,
  RiUserAddFill,
  RiUser3Fill,
  RiFileAddFill,
  RiFile4Fill,
} from "react-icons/ri";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('role');
    
    setUserRole(role);
  }, []);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={` text-gray-400   min-h-screen transition-all duration-300 ${
        isOpen ? "w-60" : "w-20"
      }`}
    >
      <ul className="h-full flex flex-col justify-between">
        <div className="grid">
          <div className="grid p-4">
            <RiFootballFill
              className={`${
                isOpen ? "hidden" : "block h-5 w-5 text-green-500"
              }`}
            />
            <span
              className={`${
                isOpen
                  ? "block text-green-500 text-center text-xl font-bold"
                  : "hidden"
              }`}
            >
              FUTBOL
            </span>
          </div>

          <div></div>

          <li
            className={
              location.pathname === "/"
                ? "text-green-500 rounded-lg  "
                : " text-gray-500"
            }
          >
            <Link
              to="/"
              className="flex items-center hover:text-gray-500 hover:bg-green-200/80  gap-4 px-4 py-2 mb-2"
            >
              <RiHomeLine
                className={`text-xl     ${
                  location.pathname === "/" ? "text-green-500" : "text-gray-500"
                }`}
              />
              <span className={`${isOpen ? "block " : "hidden"}`}>Inicio</span>
            </Link>
          </li>

          <li
            className={
              location.pathname === "/calendario"
                ? "text-green-500 rounded-lg  "
                : " text-gray-500"
            }
          >
            <Link
              to="/calendario"
              className="flex items-center  gap-4 px-4 py-2 mb-2 hover:text-gray-500 hover:bg-green-200/80 "
            >
              <RiCalendar2Fill
                className={`text-xl   ${
                  location.pathname === "/calendario"
                    ? "text-green-500"
                    : "text-gray-400 "
                }`}
              />
              <span className={`${isOpen ? "block" : "hidden"}`}>
                Calendario
              </span>
            </Link>
          </li>
          {userRole === 'admin' && (
          <li
            className={
              location.pathname === "/crearusuario"
                ? "text-green-500 rounded-lg  "
                : " text-gray-500"
            }
          >
            <Link
              to="/crearusuario"
              className="flex items-center hover:text-gray-500 hover:bg-green-200/80  gap-4 px-4 py-2 mb-2"
            >
              <RiUserAddFill
                className={`text-xl   ${
                  location.pathname === "/crearusuario"
                    ? "text-green-500"
                    : "text-gray-400 "
                }`}
              />
              <span className={`${isOpen ? "block" : "hidden"}`}>
                Registrar Usuarios
              </span>
            </Link>
          </li>
          )}
          <li
            className={
              location.pathname === "/verusuario"
                ? "text-green-500 rounded-lg  "
                : " text-gray-500"
            }
          >
            <Link
              to="/verusuario"
              className="flex items-center hover:text-gray-500 hover:bg-green-200/80  gap-4 px-4 py-2 mb-2"
            >
              <RiUser3Fill
                className={`text-xl   ${
                  location.pathname === "/verusuario"
                    ? "text-green-500"
                    : "text-gray-400 "
                }`}
              />
              <span className={`${isOpen ? "block" : "hidden"}`}>
                Ver Usuarios
              </span>
            </Link>
          </li>
          {userRole === "estudiante" && (
          <li
            className={
              location.pathname === "/subircomprobante"
                ? "text-green-500 rounded-lg  "
                : " text-gray-500"
            }
          >
            <Link
              to="/subircomprobante"
              className="flex items-center hover:text-gray-500 hover:bg-green-200/80 gap-4 px-4 py-2 mb-2"
            >
              <RiFileAddFill
                className={`text-xl   ${
                  location.pathname === "/subircomprobante"
                    ? "text-green-500"
                    : "text-gray-400 "
                }`}
              />
              <span className={`${isOpen ? "block" : "hidden"}`}>
                Subir Comprobante{" "}
              </span>
            </Link>
          </li>
          )}
          {userRole === 'admin' && (          
          <li
            className={
              location.pathname === "/vercomprobante"
                ? "text-green-500 rounded-lg  "
                : " text-gray-500"
            }
          >
            <Link
              to="/vercomprobante"
              className="flex items-center hover:text-gray-500 hover:bg-green-200/80 gap-4 px-4 py-2 mb-2"
            >
              <RiFile4Fill
                className={`text-xl   ${
                  location.pathname === "/vercomprobante"
                    ? "text-green-500"
                    : "text-gray-400 "
                }`}
              />
              <span className={`${isOpen ? "block" : "hidden"}`}>
                Ver Comprobantes
              </span>
            </Link>
          </li>
          )}
        </div>

        <div className={`${isOpen ? "p-8" : "p-0"}`}>
          <Link
            to="/perfil"
            className="p-2 flex items-center gap-4  hover:text-green-300 transition-all duration-300"
          >
            <img
              src="../../../src/assets/img/avatar.avif"
              className="w-10 h-10 rounded-full object-cover"
              alt="background"
            />
            <div className="flex flex-col gap-1">
              <span className={`${isOpen ? "block text-sm" : "hidden"}`}>
                Miguel
              </span>
              <span
                className={`${
                  isOpen ? "block text-gray-500 text-[12px]" : "hidden"
                }`}
              >
                Miguel@gmail.com
              </span>
            </div>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
