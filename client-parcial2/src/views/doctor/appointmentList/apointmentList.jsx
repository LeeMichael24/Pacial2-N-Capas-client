import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./apointmentList.css"; // Ajustar nombre del archivo de estilos si es necesario

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:8080/appointment/citas", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setAppointments(data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter === "finished") {
      return appointment.status === "Finalizado";
    } else if (filter === "available") {
      return appointment.status !== "Finalizado";
    }
    return true;
  });

  const handleAddPrescriptionClick = (appointmentId) => {
    navigate(`/doctorHome/appointmentDetail/${appointmentId}`);
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
            <Link to={`/doctorHome/appointmentDetail/${appointment.id}`}>
              <div
                className={`appointment-item ${appointment.status === "Finalizado" ? "finished" : "available"}`}
              >
                <div>
                  <h3>{appointment.commentary}</h3>
                  <p>Fecha Solicitada: {appointment.requestedDate}</p>
                  <p>Paciente: {appointment.user.name}</p>
                  <p>Estado: {appointment.status}</p>
                  <h4>Prescripciones:</h4>
                  {appointment.prescriptions.map((prescription, index) => (
                    <div key={index}>
                      <p>Medicina: {prescription.medicine}</p>
                      <p>Dosis: {prescription.dose}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => handleAddPrescriptionClick(appointment.id)}>Agregar Prescripción</button>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentList;
