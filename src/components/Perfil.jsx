import useListProfile from "../hooks/Listar/UseListProfile";
import { useEffect } from "react";

const Perfil = () => {
  const { profile, showProfile } = useListProfile();

  useEffect(() => {
    showProfile();
  }, [showProfile]);
  return (
    <div className="py-6 xl:flex justify-center ">
      <>
        <div className="bg-green-400 p-8 rounded-xl mb-8 xl:w-1/2">
          <h1 className="text-3xl text-white font-semibold mb-4">Perfil</h1>
          <hr className="mb-2"></hr>
          <form>
            <div className="flex items-center mb-4">
              <img
                src="../../src/assets/img/avatar.avif"
                className="rounded-full h-20 w-20"
              ></img>
              <div className="ml-6">
                <h2 className="font-semibold text-3xl text-white">
                  {profile.nombre} {profile.apellido}{" "}
                </h2>
                <h3 className="text-gray-200 text-xl">{profile.correo}</h3>
              </div>
            </div>

            <div className=" mb-8 flex">
              <div className="w-full mr-2">
                <div className="md:w-1/4">
                  <p className="text-white">Nombre</p>
                </div>
                <div className="  md:gap-4 gap-1">
                  <div className="w-full ">
                    <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                      {profile.nombre}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="w-full ">
                <div className="md:w-1/4">
                  <p className="text-white">Apellido</p>
                </div>
                <div className="w-full">
                  <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                    {profile.apellido}
                  </h2>
                </div>
              </div>
            </div>

            <div className=" mb-8 flex">
              <div className="w-full mr-2">
                <div className="md:w-1/4">
                  <p className="text-white">Edad</p>
                </div>
                <div className="  md:gap-4 gap-1">
                  <div className="w-full ">
                    <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                      {profile.edad}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="w-full ">
                <div className="md:w-1/4">
                  <p className="text-white">Identificacion</p>
                </div>
                <div className="w-full">
                  <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                    {profile.identificacion}
                  </h2>
                </div>
              </div>
            </div>

            <div className=" mb-8 flex">
              <div className="w-full mr-2">
                <div className="md:w-1/4">
                  <p className="text-white">Telefono</p>
                </div>
                <div className="w-full">
                  <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                    {profile.numero_celular}
                  </h2>
                </div>
              </div>

              <div className="w-full ">
                <div className="md:w-1/4">
                  <p className="text-white">Rol</p>
                </div>
                <div className="w-full">
                  <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                    {profile.id_rol}
                  </h2>
                </div>
              </div>

            </div>

            <div className=" mb-8 flex">
              <div className="w-full mr-2">
                <div className="md:w-1/4">
                  <p className="text-white">Deporte</p>
                </div>
                <div className="w-full">
                  <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                    {profile.id_grupo}
                  </h2>
                </div>
              </div>

              <div className="w-full ">
                <div className="md:w-1/4">
                  <p className="text-white">Estado</p>
                </div>
                <div className="w-full">
                  <h2 className="w-full outline-none rounded-lg py-2 px-4 bg-tertiary-900">
                    {profile.estado}
                  </h2>
                </div>
              </div>

            </div>

          </form>
        </div>
      </>
    </div>
  );
};

export default Perfil;
