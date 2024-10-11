import { useState, useEffect } from "react";
import useListRecordartorios from "../hooks/Listar/useListRecordatorios";
import useAddEvent from "../hooks/AgregarEventos/useAddEvent";
import { RiDeleteBin5Fill, RiCloseLargeFill } from "react-icons/ri";
import useDeleteEvent from "../hooks/Eliminar/useDeleteEvent";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const { recordatorios, loading, error } = useListRecordartorios();
  const { addEvent, loading: loadingAdd, error: errorAdd } = useAddEvent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [newEvent, setNewEvent] = useState({
    titulo: "",
    descripcion: "",
    fecha_hora: "",
  });
  const {
    deleteEvent,
    loading: loadingDelete,
    error: errorDelete,
  } = useDeleteEvent();
  useEffect(() => {
    const role = localStorage.getItem("role");

    setUserRole(role);
  }, []);

  const handleMonthChange = (event) => {
    const month = parseInt(event.target.value, 10);
    setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
  };

  const handleDelete = async (id) => {
    await deleteEvent(id);
  };

  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value, 10);
    setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
  };

  const handleDayClick = (day) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    const now = new Date();

    if (
      date > now ||
      (date.toDateString() === now.toDateString() && now.getHours() >= 0)
    ) {
      setSelectedDate(date);
      setNewEvent((prev) => ({
        ...prev,
        fecha_hora:
          date.toISOString().slice(0, 10) +
          "T" +
          date.toTimeString().slice(0, 5),
      }));
    }
  };

  const daysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const startDay = () => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    return firstDay.getDay();
  };

  const getEventsForSelectedDate = () => {
    const events = recordatorios.filter((event) => {
      const [datePart, timePart] = event.fecha_hora.split(" "); // Divide fecha y hora
      const [year, month, day] = datePart.split("-").map(Number);
      const [hour, minute, second] = timePart.split(":").map(Number);

      const eventDate = new Date(year, month - 1, day, hour, minute, second); // Crea la fecha manualmente

      return (
        eventDate.getFullYear() === selectedDate.getFullYear() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getDate() === selectedDate.getDate()
      );
    });

    return events.sort(
      (a, b) =>
        new Date(a.fecha_hora.replace(" ", "T")) -
        new Date(b.fecha_hora.replace(" ", "T"))
    );
  };

  const renderEventTable = () => {
    if (!selectedDate) return null;

    const startOfWeek = new Date(selectedDate);
    const weekDays = [];
    for (let i = -3; i <= 3; i++) {
      const dateKey = new Date(startOfWeek);
      dateKey.setDate(startOfWeek.getDate() + i);
      weekDays.push(dateKey);
    }

    return (
      <div className="overflow-x-auto backdrop-blur-sm bg-gray-200 p-2 shadow-lg rounded-lg">
        <table className="min-w-full table-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr>
              <th className=""></th>
              {weekDays.map((date, index) => (
                <th
                  key={index}
                  className={`border p-4 text-center ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <div>
                    <span className="text-gray-500 text-sm block">
                      {date
                        .toLocaleDateString("es-ES", { weekday: "short" })
                        .toUpperCase()}
                    </span>
                    <span className="text-lg font-bold">{date.getDate()}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(24)]
              .map((_, hour) => {
                const adjustedHour = hour + 1;
                return (
                  <tr key={hour}>
                    <td className="p-5 w-24">{`${
                      adjustedHour % 12 === 0 ? 12 : adjustedHour % 12
                    } ${adjustedHour < 12 ? "AM" : "PM"}`}</td>
                    {weekDays.map((date, index) => {
                      const formattedDate = date.toISOString().split("T")[0];

                      const hourEvents = recordatorios.filter((event) => {
                        const [datePart, timePart] =
                          event.fecha_hora.split(" ");
                        const [year, month, day] = datePart
                          .split("-")
                          .map(Number);
                        const [hour, minute, second] = timePart
                          .split(":")
                          .map(Number);

                        const eventDate = new Date(
                          year,
                          month - 1,
                          day,
                          hour,
                          minute,
                          second
                        );

                        return (
                          eventDate.toISOString().split("T")[0] ===
                            formattedDate &&
                          eventDate.getHours() === adjustedHour
                        );
                      });

                      return (
                        <td
                          key={index}
                          className={`border p-2 transition-all duration-300 ${
                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
                          }`}
                        >
                          {hourEvents.map((event, i) => (
                            <div
                              key={i}
                              className="bg-green-400  text-white rounded-lg p-1 shadow-md
                            transform hover:scale-110 transition-transform duration-300"
                            >
                              <strong className="ml-2">{event.titulo}</strong>
                              <p className="ml-2">{event.descripcion}</p>
                              <span className="ml-2">
                                {new Date(event.fecha_hora).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                            </div>
                          ))}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
              .slice(4)}
          </tbody>
        </table>
      </div>
    );
  };

  const isPastDate = (day) => {
    const dateToCheck = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return dateToCheck < today;
  };

  const openModal = () => {
    if (selectedDate) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewEvent({ titulo: "", descripcion: "", fecha_hora: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate =
      newEvent.fecha_hora.slice(0, 10) +
      " " +
      newEvent.fecha_hora.slice(11, 16) +
      ":00";

    await addEvent({ ...newEvent, fecha_hora: formattedDate }, null);
    closeModal();
  };

  const renderModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-gray-100 p-8 rounded shadow-lg relative">
          <h1 className="font-extrabold text-4xl text-green-600 mb-6 text-center">
            Agregar Evento
          </h1>
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-1 right-2  "
          >
            <RiCloseLargeFill className="text-red-500 mt-2" />
          </button>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Título:</label>
              <input
                type="text"
                name="titulo"
                value={newEvent.titulo}
                onChange={handleInputChange}
                required
                className="border p-1 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label>Descripción:</label>
              <input
                type="text"
                name="descripcion"
                value={newEvent.descripcion}
                onChange={handleInputChange}
                required
                className="border p-4 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label>Hora:</label>
              <input
  type="time"
  name="hora"
  value={newEvent.fecha_hora.slice(11, 16)}
  onChange={(e) =>
    handleInputChange({
      target: {
        name: "fecha_hora",
        value:
          newEvent.fecha_hora.slice(0, 10) + "T" + e.target.value,
      },
    })
  }
  min="05:00"
  max="23:00"
  required
  className="border p-1 w-full rounded-lg mb-3 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
/>

            </div>
            <div className="flex flex-col items-center mt-2 space-y-2">
              <button
                type="submit"
                className={`bg-green-400 text-white p-2 rounded w-100 ${
                  loadingAdd ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loadingAdd}
              >
                {loadingAdd ? "Agregando..." : "Agregar Evento"}
              </button>
            </div>
            {errorAdd && <div className="text-red-500">{errorAdd}</div>}
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto flex  ">
      <div className="w-64 p-4 ">
        <div className="mb-4">
          <span className="font-bold text-3xl">
            {currentDate
              .toLocaleString("default", { month: "long" })
              .charAt(0)
              .toUpperCase() +
              currentDate
                .toLocaleString("default", { month: "long" })
                .slice(1)}{" "}
            <span className="text-green-500">{currentDate.getFullYear()}</span>
          </span>
        </div>

        <select
          onChange={handleMonthChange}
          value={currentDate.getMonth()}
          className="border p-1  mb-2 rounded-lg shadow-md mr-3"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
        <select
          onChange={handleYearChange}
          value={currentDate.getFullYear()}
          className="border p-1 mb-3 rounded-lg shadow-md"
        >
          {Array.from({ length: 50 }, (_, i) => (
            <option key={i} value={currentDate.getFullYear() - 25 + i}>
              {currentDate.getFullYear() - 25 + i}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-7 gap-1 text-center bg-white-400">
          {["Do", "Lu", "Ma", "Mie", "Ju", "Vi", "Sa"].map((day) => (
            <div key={day} className="font-bold">
              {day}
            </div>
          ))}
          {Array.from({ length: startDay() }).map((_, i) => (
            <div key={i} className="p-2"></div>
          ))}
          {Array.from({ length: daysInMonth(currentDate) }).map((_, day) => {
            const dayNum = day + 1;
            const isSelected =
              selectedDate &&
              selectedDate.getDate() === dayNum &&
              selectedDate.getMonth() === currentDate.getMonth() &&
              selectedDate.getFullYear() === currentDate.getFullYear();

            return (
              <div
                key={dayNum}
                className={`relative inline-block cursor-pointer text-black ${
                  isPastDate(dayNum) ? "text-gray-400" : ""
                } ${
                  isSelected
                    ? "bg-green-400 rounded-full"
                    : "hover:bg-green-400 rounded-full py-1"
                }`}
                onClick={() => handleDayClick(dayNum)}
                style={{ pointerEvents: isPastDate(dayNum) ? "none" : "auto" }}
              >
                <span className={`m-auto`}>{dayNum}</span>
                {recordatorios.some((event) => {
                  const eventDate = new Date(event.fecha_hora + "Z");
                  return (
                    eventDate.toISOString().split("T")[0] ===
                    `${currentDate.getFullYear()}-${String(
                      currentDate.getMonth() + 1
                    ).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`
                  );
                }) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-red-500 rounded-full w-2 h-2"></div>
                )}
              </div>
            );
          })}
        </div>

        {selectedDate && (
          <>
            {userRole !== "estudiante" && (
              <button
                onClick={openModal}
                className="mt-4 bg-green-500 text-white p-2 rounded  bg-gradient-to-r from-[#71fb9d] via-[#1de12d] to-[#12be15] hover:shadow-xl hover:shadow-green-500 hover:scale-105 duration-300 hover:from-[#12be2c] hover:to-[#71fb86]"
              >
                Agregar Evento
              </button>
            )}
            <div className="mt-4">
              <h3 className="font-bold">
                Eventos en {selectedDate.toLocaleDateString()}
              </h3>
              <ul className="list-disc pl-5">
                {getEventsForSelectedDate().length > 0 ? (
                  getEventsForSelectedDate().map((event, index) => (
                    <div className="flex justify-between mb-2" key={index}>
                      <li>
                        <strong>{event.titulo}</strong>:<br />{" "}
                        {event.descripcion} <br />
                        <span>
                          {new Date(event.fecha_hora).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </li>
                      {userRole !== "estudiante" && (
                        <div className="grid items-center">
                          <button
                            className="flex justify-center items-center mr-2 gap-2 w-8 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                            onClick={() => handleDelete(event.id)}
                          >
                            <RiDeleteBin5Fill />
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <li>No hay eventos para este día.</li>
                )}
              </ul>
              {loadingDelete && <div>Eliminando...</div>}
              {errorDelete && <div className="text-red-500">{errorDelete}</div>}
            </div>
          </>
        )}
      </div>
      <div className="flex-1 p-4 ">
        <h2 className="text-4xl md:text-7xl font-extrabold text-center text-green-500 mb-3 tracking-wider animate-pulse drop-shadow-lg">
          Eventos de la semana
        </h2>
        {loading ? (
          <div>Cargando...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          renderEventTable()
        )}

        {renderModal()}
      </div>
    </div>
  );
};

export default Calendar;
