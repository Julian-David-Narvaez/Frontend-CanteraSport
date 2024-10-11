import PropTypes from "prop-types";

import useAuthToken from "../../../../landing_page_react/src/views/hook/Token/useAuthToken";
import { Menu, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { RiNotification3Line, RiLogoutBoxRLine } from "react-icons/ri";

const Header = () => {
  const { removeToken } = useAuthToken();

  return (
    <header className={`bg-white  p-4 transition-all duration-300 `}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-500">Cantera Sport</h1>

        <nav className="flex items-center xl:gap-x-2">
          
          <Menu
            menuButton={
              <MenuButton className="relative hover:bg-tertiary-100 p-4 rounded-lg transition-colors">
                <RiNotification3Line className="h-6 w-6" />
                <span className="absolute top-2 right-3 bg-secundary py-0.5 px-[5px] text-white rounded-full text-[8px] font-bold">
                  2
                </span>
              </MenuButton>
            }
            transition
            menuClassName="p-1 bg-transparent "
          ></Menu>
          <button
            onClick={removeToken}
            className="relative inline-flex items-center justify-center gap-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white hover:bg-[#F5F5F5] h-9 rounded-md px-3 group"
          >
            <RiLogoutBoxRLine className="h-6 w-6 text-green-400" />
            <span className="text-green-400 |origin-left scale-0 transition-transform group-hover:scale-100">
              Cerrar Sesion{" "}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

Header.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
