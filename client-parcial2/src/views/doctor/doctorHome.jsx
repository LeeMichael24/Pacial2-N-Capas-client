import "./doctorHome.css";
import Navbar from "../../components/navbar/navbar";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Menu from "../../components/menu/menu";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

//iconos
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

function DoctorHome() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [appDate, setAppDate] = useState(""); // Agregar estado para la fecha de la cita
  const navigate = useNavigate();

  const fetchAppointments = async (date = "") => {
    try {
      const response = await fetch(`http://localhost:8080/api/clinic/schedule1${date?`?appDate=${date}` : ""}`, {
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

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDateChange = (event) => {
    setAppDate(event.target.value);
  };

  const handleSearchClick = () => {
    fetchAppointments(appDate);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter === "finished") {
      return appointment.status === "Finalizado";
    } else if (filter === "available") {
      return appointment.status !== "Finalizado";
    }
    return true;
  });

  const buttons = [
    {
      icon: <LogoutRoundedIcon />,
      name: "Crear cita médica",
      path: "/doctorHome/crearCita",
    },
    {
      icon: <TextSnippetIcon />,
      name:"Inicio",
      path: "/doctorHome",
    },
    {
      icon: <FormatListBulletedIcon />,
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

  return (
    <section className="PadreHomeUser">
      <Navbar />
      <div className="UserHome">
        <div className="left-container-user leftDoctor">
          <div className="appointment-list">
            <h2 className="h2List">Listado de Citas</h2>

            <ul>
              {filteredAppointments.map((appointment) => (
                <li key={appointment.id}>
                  <div
                    className={`appointment-item ${appointment.status === "Finalizado" ? "finished" : "available"}`}
                  >
                    <div>
                      <h3>{appointment.commentary}</h3>
                      <p>Paciente: {appointment.user.name}</p>
                      <p>Fecha Solicitada: {appointment.requestedDate}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Agregar campo de entrada para la fecha y botón de búsqueda */}
          <div className="search-container">
            <h2 className="h2List">Buscar Citas por Fecha</h2>
            <input
              type="date"
              value={appDate}
              onChange={handleDateChange}
              placeholder="Ingrese la fecha de la cita"
            />
            <button onClick={handleSearchClick}>Buscar</button>
          </div>
        </div>
        <div className="right-container-user">
          <Menu buttons={buttons} />
        </div>
      </div>
    </section>
  );
}

export default DoctorHome;
