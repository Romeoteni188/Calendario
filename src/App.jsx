import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faGavel } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import "moment/locale/es";
import "./App.css";
import { useState, useEffect } from "react";

moment.locale("es");

function App() {
  const localizer = momentLocalizer(moment);

  const events = [
    {
      start: moment("2024-12-09T12:00:00").toDate(),
      end: moment("2024-12-09T12:00:00").toDate(),
      id: 1,
      person: "alexa papa",
      data: {
        x: 5,
      },
    },
    {
      start: new Date("2024-12-10"),
      end: new Date("2024-12-10"),
      id: 2,
      person: "Ana Pacay sagastume",
      data: {
        x: 50,
      },
    },
    {
      start: new Date("2024-12-10"),
      end: new Date("2024-12-10"),
      id: 2,
      person: "Carlos Cante Ruiz",
      data: {
        x: 50,
      },
    },
    {
      start: new Date("2024-12-11"),
      end: new Date("2024-12-11"),
      id: 2,
      person: "Pedro Picapiedra",
      data: {
        x: 5,
      },
    },
    {
      start: new Date("2024-12-11"),
      end: new Date("2024-12-11"),
      id: 2,
      person: "Jennifer Cacao Guevara",
      data: {
        x: 10,
      },
    },
    {
      start: moment("2024-12-11T12:00:00").toDate(),
      end: moment("2024-12-11T12:00:00").toDate(),
      id: 5,
      person: "alexa coc",
      data: {
        x: 20,
      },
    },
    {
      start: moment("2024-12-11T12:00:00").toDate(),
      end: moment("2024-12-11T12:00:00").toDate(),
      id: 2,
      person: "Juan Pérez",
      data: {
        x: 20,
      },
    },
    {
      start: moment("2024-12-12T12:00:00").toDate(),
      end: moment("2024-12-12T12:00:00").toDate(),
      id: 5,
      person: "alexa coc",
      data: {
        x: 20,
      },
    },
    {
      start: moment("2024-12-12T12:00:00").toDate(),
      end: moment("2024-12-12T12:00:00").toDate(),
      id: 6,
      person: "benedito chun caal cobra",
      data: {
        x: 20,
      },
    },
    {
      start: moment("2024-12-12T12:00:00").toDate(),
      end: moment("2024-12-12T12:00:00").toDate(),
      id: 3,
      person: "Carlos prado caal mazc",
      data: {
        x: 10,
      },
    },
    {
      start: moment("2024-12-12T12:00:00").toDate(),
      end: moment("2024-12-12T12:00:00").toDate(),
      id: 4,
      person: "Juan Pérez",
      data: {
        x: 10,
      },
    },
  ];

  //para capturar la accion de los botones de back y next para mostrar una alerta
  const handleNavigate = (date, view, action) => {
    if (action === "PREV") {
      alert("Mes Anterior");
    } else if (action === "NEXT") {
      alert("Mes Siguiente");
    }
    //console.log(`Navigated to ${date} in ${view} view with action ${action}`);
  };

  const handleSelectEvent = (event) => {
    alert(`Seleccionaste a la persona NUM: ${event.id},${event.person}`);
  };

  const handleSelectSlot = (slotInfo) => {
    alert(
      `No hay eventos en esta fecha: ${moment(slotInfo.start).format(
        "DD/MM/YYYY"
      )}`
    );
    console.log("evento vacio");
  };

  const components = {
    event: (props) => {
      const { title, description, person, data } = props.event;
      // Determina la clase y el icono basándote en el valor de x
      let icon;
      let eventClass = ""; // Clase para aplicar estilos personalizados

      if (data.x > 15) {
        icon = faCheck;
        eventClass = "event-green";
      } else if (data.x === 10) {
        icon = faGavel;
        eventClass = "event-cafe";
      } else {
        icon = faCircleXmark;
        eventClass = "event-red";
      }
      return (
        <div className={eventClass}>
          <FontAwesomeIcon icon={icon} className="event-icon" />
          <div className="event-content">
            <span className="event-text">{person}</span>
          </div>
        </div>
      );
    },
  };

  const handleShowMore = (events, date) => {
    setEventsForDay(events);
    setIsModalOpen(true);
  };

  //para cambiar de ventana
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [view, setView] = useState("month"); //para establecer la vista por defecto

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    //cambio de ventana
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth <= 640) {
      setView("agenda");
    } else {
      setView("month");
    }
  }, [windowWidth]);

  return (
    <div className="calendario">
      <Calendar
        localizer={localizer}
        events={events}
        view={view} //para vista de agenda
        onView={(newView) => setView(newView)} 
        views={["month", "agenda"]} //para manejar las vistas de cual usar , quitar el dia dia que es day , week semana
        // defaultView={"month"} //para tener una vista por defecto
        //view={"month" } // es dinamico  lo podemos colocar un boton es como el value pero bloquea los botones
        //date={moment("2024-12-05T12:00:00").toDate()}  //para controlar la fecha inicial del calendario
        selectable={true}
        toolbar={true} //controlar el encabezado del calendario
        //controlar las horas de los dias
        min={moment("2024-12-04T08:00:00").toDate()}
        max={moment("2024-12-04T18:00:00").toDate()}
        formats={{
          dayHeaderFormat: (date) => moment(date).format("DD/MM/YY"),
          monthHeaderFormat: (date) => moment(date).format("MMMM YYYY"),
          dayRangeHeaderFormat: ({ start, end }) =>
            `${moment(start).format("DD MMMM")} - ${moment(end).format(
              "DD MMMM"
            )}`,
          timeGutterFormat: () => "", // Elimina el formato de tiempo
          agendaTimeFormat: () => "", // Elimina la hora en la vista de agenda
          agendaHeaderFormat: ({ start, end }) =>
            `Agenda del ${moment(start).format("DD/MM/YYYY")} al ${moment(
              end
            ).format("DD/MM/YYYY")}`,
        }}
        popup={true}
        onShowMore={handleShowMore} //maneja el clic en +N mas
        onNavigate={handleNavigate} // Maneja la navegación aquí
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        components={components}
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          date: "Fecha",
          time: "",
          event: "Evento",
          allDay: "Todo el día",
          noEventsInRange: "No hay eventos en este rango de fechas.",
          showMore: (count) => `+${count} más`,
        }}
      />
    </div>
  );
}

export default App;
