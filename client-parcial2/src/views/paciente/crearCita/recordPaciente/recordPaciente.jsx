import Navbar from "../../../../components/navbar/navbar";
import Menu from "../../../../components/menu/menu";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import "./recordPaciente.css";
import { useNavigate, useParams } from "react-router-dom";
import CardDetail from "../../../../components/cards/cardDetails/cardDetail";
import { useState } from "react";

function RecordPaciente() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);

  const buttons = [
    {
      icon: <LogoutRoundedIcon />,
      name: "Record médico",
      path: "/paciente/misCitasRecord",
    },
    {
      icon: <LogoutRoundedIcon />,
      name: "Crear cita médica",
      path: "/paciente/crearCitaMedica",
    },
    {
      icon: <LogoutRoundedIcon />,
      name: "Prescipciones médicas",
      path: "/paciente/misPrescipciones",
    },
    { icon: <LogoutRoundedIcon />, name: "Cerrar sesión", path: "/login" },
  ];

  const Data = [
    {
      id: 1,
      title: "34",
      date: "04/20/24",
      time: "11:30",
      presciption: "2 pastilla cada 12h, por 5 días",
    },
    {
      id: 2,
      title: "48",
      date: "05/20/24",
      time: "14:30",
      presciption: "2 pastilla cada 12h, por 5 días",
    },
  ];

  function handleCardClick(item) {
    setSelectedCard(item.id);
    navigate(`/paciente/misCitasRecord/${item.id}`);
  }

  return (
    <section className="PadreHomeUser">
      <Navbar />
      <div className="UserHome">
        <div className="left-container-user">
          <div className="pacienteContainer">
            <h1>Mi Record Citas Médicas</h1>
            <div className="card-style-mt">
              {Data.map((item) => (
                <CardDetail
                  key={item.id}
                  title={item.title}
                  date={item.date}
                  time={item.time}
                  presciption={item.presciption}
                  onClick={() => handleCardClick(item)}
                  isSelected={item.id === selectedCard}
                />
              ))}
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

export default RecordPaciente;
