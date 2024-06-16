import { useState } from "react";
import "./doctorHome.css";
import Navbar from "../../components/navbar/navbar";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Menu from "../../components/menu/menu";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Iconos
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

function DoctorHome() {
  const [identifier, setIdentifier] = useState('');
  const [reason, setReason] = useState('');

  const buttons = [
    {
      icon: <TextSnippetIcon />,
      name: "Crear Record médico",
      path: "/doctorHome",
    },
    {
      icon: <FormatListBulletedIcon />,
      name: "Citas",
      path: "/doctorHome/appointmentList",
    },
    {
      icon: <ContentPasteSearchIcon  />,
      name: "Buscar Prescripción",
      path: "/doctorHome/prescriptionPerId",
    },
    { icon: <LogoutRoundedIcon />, name: "Cerrar sesión", path: "/login" },
  ];

  const handleAddEntry = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/user/record', 
        {
          identifier,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Historial actualizado exitosamente!');
      setIdentifier('');
      setReason('');
    } catch (error) {
      toast.error(`Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <section className="PadreHomeUser">
      <Navbar />
      <ToastContainer />
      <div className="UserHome">
        <div className="left-container-user leftDoctor">
          <form onSubmit={handleAddEntry} className="add-entry-form">
            <h2>Agregar Entrada al Historial Médico</h2>
            <label>
              Identificador del Paciente:
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </label>
            <label>
              Razón:
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </label>
            <button type="submit">Agregar Entrada</button>
          </form>
        </div>
        <div className="right-container-user">
          <Menu buttons={buttons} />
        </div>
      </div>
    </section>
  );
}

export default DoctorHome;
