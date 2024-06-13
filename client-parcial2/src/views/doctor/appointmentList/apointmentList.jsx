import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./apointmentList.css"; // Ajustar nombre del archivo de estilos si es necesario

const AppointmentsData = [
  { id: 1, description: "Consulta General", date: "2024-06-20", finished: false },
  { id: 2, description: "Control de Rutina", date: "2024-06-22", finished: true },
  { id: 3, description: "Exámen de Laboratorio", date: "2024-06-25", finished: false },
  { id: 4, description: "Consulta Especializada", date: "2024-06-28", finished: false },
];

function AppointmentList() {
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredAppointments = AppointmentsData.filter((appointment) => {
    if (filter === "finished") {
      return appointment.finished;
    } else if (filter === "available") {
      return !appointment.finished;
    }
    return true;
  });

  const handleAppointmentClick = (appointmentId) => {
    console.log(`Seleccionaste la cita con ID: ${appointmentId}`);
    // Aquí podrías manejar la navegación hacia la página de prescripciones médicas para el appointmentId dado
  };

  return (
    <div className="appointment-list">
      <h2 className="h2List">Listado de Citas</h2>
      <div className="filters">
        <label>
          <input
            type="radio"
            value="all"
            checked={filter === "all"}
            onChange={handleFilterChange}
          />
          Todas
        </label>
        <label>
          <input
            type="radio"
            value="finished"
            checked={filter === "finished"}
            onChange={handleFilterChange}
          />
          Finalizadas
        </label>
        <label>
          <input
            type="radio"
            value="available"
            checked={filter === "available"}
            onChange={handleFilterChange}
          />
          Disponibles
        </label>
      </div>
      <ul>
        {filteredAppointments.map((appointment) => (
          <li key={appointment.id}>
            <Link
              to={`/doctorHome/appointmentList/${appointment.id}`}
              className={`appointment-item ${appointment.finished ? "finished" : "available"}`}
              onClick={() => handleAppointmentClick(appointment.id)}
            >
              <div>
                <h3>{appointment.description}</h3>
                <p>Fecha: {appointment.date}</p>
              </div>
              <button>Agregar Prescripción</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentList;
