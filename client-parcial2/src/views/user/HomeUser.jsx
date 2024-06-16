import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Menu from "../../components/menu/menu";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import './HomeUser.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../api/axios"; // Importa la instancia de Axios

//iconos

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

function HomeUser() {
  const navigate = useNavigate();

  const [comentario, setComentario] = useState("");
  const [requestedDate, setRequestedDate] = useState("");

  const buttons = [
    { icon: <AdminPanelSettingsIcon />, name: "SUDO", path: "/admin" },
    { icon: <LocalHospitalIcon />, name: "DOCT", path: "/doctorHome" },
    { icon: <SupervisorAccountIcon />, name: "PSNT", path: "/paciente" },
    { icon: <RecentActorsIcon />, name: "ASST", path: "/asistant" },
    { icon: <LogoutRoundedIcon />, name: "Cerrar sesión", path: "/login" },

  ];

  const handlerClick = (e) => {
    e.preventDefault();

    // Crear el objeto de datos que se enviará
    const data = {
      comentario: comentario,
      requested_date: requestedDate,
    };

    // Obtener el token JWT del almacenamiento local (localStorage)
    const token = localStorage.getItem('token');
    console.log(token);

    // Configurar los encabezados para incluir el token JWT
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    // Hacer el POST a la API usando Axios con los encabezados configurados
    axios.post("/appointment/request", data, config)
      .then((response) => {
        toast.success("Cita creada exitosamente!");
        toast.success("Ahora eres paciente!");
        setTimeout(() => {
          navigate('/paciente');
        }, 2000);
      })
      .catch((error) => {
        toast.error("Error al crear la cita");
        console.error("There was an error creating the appointment!", error);
      });
  }

  return (
    <section className="PadreHomeUser">
      <Navbar />
      <ToastContainer />
      <div className="UserHome">
        <div className="left-container-user">
          <h1 className="h1-user">DEBES CREAR UNA CITA PARA ACTIVAR <p></p>LAS FUNCIONES COMO PACIENTE</h1>
          <div className="containerUserCita">
            <div className="hijoCita">
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "100%" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    id="outlined-comentary"
                    label="Describe your symptoms"
                    type="text"
                    className="textFieldLogin"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-date"
                    label=""
                    type="date"
                    className="textFieldLogin"
                    value={requestedDate}
                    onChange={(e) => setRequestedDate(e.target.value)}
                  />
                </div>
              </Box>
              <button className="btnUserHome" onClick={handlerClick}>
                Agendar Cita
              </button>
            </div>
          </div>
        </div>
        <div className="right-container-user">
          <Menu buttons={buttons} />
        </div>
      </div>
    </section>
  );
}

export default HomeUser;
