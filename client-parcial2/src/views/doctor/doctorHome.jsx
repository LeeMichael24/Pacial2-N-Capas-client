import "./doctorHome.css";
import Navbar from "../../components/navbar/navbar";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Menu from "../../components/menu/menu";
import AppointmentList from "./prescriptionPerId/prescriptionPerId";

//iconos
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';


function DoctorHome() {
  const buttons = [
    {
      icon: <LogoutRoundedIcon />,
      name: "Crear cita médica",
      path: "/doctorHome/crearCita",
    },
    {
      icon: <TextSnippetIcon />,
      name: "Record médico",
      path: "/doctorHome",
    },
    {
      icon: <FormatListBulletedIcon />,
      name: "Citas",
      path: "/doctorHome/appointmentList",
    },

    {
      icon: <ContentPasteSearchIcon  />,
      name: "Busar Prescripción",
      path: "/doctorHome/prescriptionPerId",
    },
    { icon: <LogoutRoundedIcon />, name: "Cerrar sesión", path: "/login" },
  ];

  return (
    <section className="PadreHomeUser">
      <Navbar />
      <div className="UserHome">
        <div className="left-container-user leftDoctor">
          //Record Medico
        </div>
        <div className="right-container-user">
          <Menu buttons={buttons} />
        </div>
      </div>
    </section>
  );
}

export default DoctorHome;
