import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./apointmentList.css"; 

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/clinic/schedule1", {
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
      
    
      <ul>
        {filteredAppointments.map((appointment) => (
          <li key={appointment.id}>
            <Link to={`/doctorHome/appointmentDetail/${appointment.id}`}>
              <div
                className={`appointment-item ${appointment.status === "Finalizado" ? "finished" : "available"}`}
              >
                <div>
                  
                  <h3>{appointment.commentary}</h3>
                  <p>Paciente: {appointment.user.name}</p>
                  <p>Fecha Solicitada: {appointment.requestedDate}</p>
                
              
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
