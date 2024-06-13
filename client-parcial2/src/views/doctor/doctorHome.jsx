import "./doctorHome.css";
import Navbar from "../../components/navbar/navbar";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Menu from "../../components/menu/menu";
import PrescriptionForm from "./preinscriptionFrom/prescriptionForm";

function DoctorHome() {
  const buttons = [
    {
      icon: <LogoutRoundedIcon />,
      name: "Crear cita médica",
      path: "/paciente/crearCitaMedica",
    },
    {
      icon: <LogoutRoundedIcon />,
      name: "Record médico",
      path: "/paciente/misCitasRecord",
    },
    {
      icon: <LogoutRoundedIcon />,
      name: "Prescipciones médicas",
      path: "/paciente/misPrescipciones",
    },
    { icon: <LogoutRoundedIcon />, name: "Cerrar sesión", path: "/login" },
  ];

  return (
    <section className="PadreHomeUser">
      <Navbar />
      <div className="UserHome">
        <div className="left-container-user leftDoctor">
          <PrescriptionForm />
        </div>
        <div className="right-container-user">
          <Menu buttons={buttons} />
        </div>
      </div>
    </section>
  );
}

export default DoctorHome;
