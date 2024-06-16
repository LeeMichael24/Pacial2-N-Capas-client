import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './prescriptionPerId.css'

// Iconos
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Navbar from "../../../components/navbar/navbar";
import Menu from "../../../components/menu/menu";

function PrescriptionPerId() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [userId, setUserId] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);


  const buttons = [
    {
      icon: <TextSnippetIcon />,
      name: "Inicio",
      path: "/doctorHome",
    },
    {
      icon: <FormatListBulletedIcon />,
      name: "Record de pacientes",
      path: "/doctorHome/crearRecord",
    },
    {
      icon: <PlaylistAddCircleIcon />,
      name: "Agregar Prescripción",
      path: "/doctorHome/appointmentList",
    },
    {
      icon: <ContentPasteSearchIcon />,
      name: "Buscar Prescripción",
      path: "/doctorHome/prescriptionPerId",
    },
    {
      icon: <AssignmentTurnedInIcon />,
      name: "Finalizar cita",
      path: "/doctorHome/finalizarCita",
    },

    { icon: <LogoutRoundedIcon />, name: "Cerrar sesión", path: "/login" },
  ];

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
    <section className="PadreHomeUser">
      <Navbar />
      <div className="UserHome">
        <div className="appointment-list">
          <h2 className="h2ListApp"> Pacientes</h2>

          <ul>
            {filteredAppointments.map((appointment) => (
              <li key={appointment.id}>
                <div className={`appointment-item ${appointment.status === "Finalizado" ? "finished" : "available"}`}>
                  <div>
                    <span>
                      <h3>{appointment.user.name}</h3>
                      <p>ID: {appointment.user.id}</p>
                    </span>
                  </div>
                </div>
              </li>
            ))}

          </ul>

          <div className="appointment-list">
            <h2 className="h2ListApp">Buscar Prescripcion por ID de usuario</h2>
            <div className="adentro2">
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Ingrese el ID del usuario"
            />
            <button className="boton" onClick={handleSearchClick}>Buscar</button>
            </div>
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
        <div className="right-container-user">
          <Menu buttons={buttons} />
        </div>
      </div>
    </section>

  );
}

export default PrescriptionPerId;
