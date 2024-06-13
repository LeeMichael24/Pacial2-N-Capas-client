import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './prescriptionPerId.css'

function PrescriptionPerId() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [userId, setUserId] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);

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


  const handleSearchClick = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/clinic/prescriptions/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setPrescriptions(data.data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter === "finished") {
      return appointment.status === "Finalizado";
    } else if (filter === "available") {
      return appointment.status !== "Finalizado";
    }
    return true;
  });

  return (
    <div className="appointment-list">
      <h2 className="h2ListApp">Buscar Prescripcion</h2>

      <ul>
        {filteredAppointments.map((appointment) => (
          <li key={appointment.id}>
            <div className={`appointment-item ${appointment.status === "Finalizado" ? "finished" : "available"}`}>
              <div>
                <span>
                  <h3>Paciente: {appointment.user.name}</h3>
                  <p>Comentario: {appointment.commentary}</p>
                  <p>ID: {appointment.user.id}</p>
                </span>
              </div>
            </div>
          </li>
        ))}

      </ul>

      <div className="appointment-list">
        <h2 className="h2ListApp">Buscar Prescripcion</h2>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Ingrese el ID del usuario"
        />
        <button onClick={handleSearchClick}>Buscar Prescripción</button>
        <ul>
          {prescriptions.map((prescription) => (
            <li key={prescription.id}>
              <div className="prescription-item">
                <h3>Prescripción ID: {prescription.id}</h3>
                <p>Medicina: {prescription.medicine}</p>
                <p>Dosis: {prescription.dose}</p>
                <p>Fecha Fin: {prescription.fechaFin}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>



    </div>

  );
}

export default PrescriptionPerId;
