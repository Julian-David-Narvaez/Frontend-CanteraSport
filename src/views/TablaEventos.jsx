const renderEventTable = () => {
    if (!selectedDate) return null;
  
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - (selectedDate.getDay() - 1)); 
  
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const dateKey = new Date(startOfWeek);
      dateKey.setDate(startOfWeek.getDate() + i);
      weekDays.push(dateKey);
    }
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="border p-2">Hora</th>
              {weekDays.map((date, index) => (
                <th key={index} className="border p-2 text-center">
                  {date.getDate()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(24)].map((_, hour) => (
              <tr key={hour} className="border-t">
                <td className="border p-2">{`${hour}:00`}</td>
                {weekDays.map((date, index) => {
                  const formattedDate = date.toISOString().split('T')[0];
  
                  // Filtrar eventos para el día y la hora actual
                  const hourEvents = recordatorios.filter(event => {
                    const eventDate = new Date(event.fecha_hora + 'Z');
                    return (
                      eventDate.toISOString().split('T')[0] === formattedDate &&
                      eventDate.getHours() === hour
                    );
                  });
  
                  return (
                    <td key={index} className="border p-2">
                      {hourEvents.length > 0 ? (
                        hourEvents.map((event, i) => (
                          <div key={i} className="text-xs">
                            <strong>{event.titulo}</strong>: {event.descripcion} - {new Date(event.fecha_hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        ))
                      ) : (
                        <div className="text-xs">Sin eventos</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };