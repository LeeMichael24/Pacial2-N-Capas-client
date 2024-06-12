import './pacienteHome.css'
import Navbar from "../../components/navbar/navbar";
import Menu from "../../components/menu/menu";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";


function PacienteHome() {
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
    /* TODO: Mis prescriociones medicas */
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
        <div className="left-container-user">
          <div className="pacienteContainer">
            <h1>Bienvenido</h1>
            <h2>Clínica Ya Merito</h2>
            <p>
              En la parte derecha de la pantalla veras una serie de botones los cuales te redirijiran hacia el contenido que quieras visualizar.
            </p>
          </div>
        </div>
        <div className="right-container-user">
          <Menu buttons={buttons} />
        </div>
      </div>
    </section>
  );
}

export default PacienteHome;
