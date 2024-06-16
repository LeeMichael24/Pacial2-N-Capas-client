import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./apointmentList.css";


// Iconos
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Navbar from "../../../components/navbar/navbar";
import Menu from "../../../components/menu/menu";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

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
    <section className="PadreHomeUser">
      <Navbar />
      <div className="UserHome">
        <div className="left-container-user">
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
        <div className="right-container-user">
          <Menu buttons={buttons} />
        </div>
      </div>
    </section>
  );
}

export default AppointmentList;
