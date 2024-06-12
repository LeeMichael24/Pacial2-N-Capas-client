import "./recordDetailPaciente.css";
import Navbar from "../../../../../components/navbar/navbar";
import Menu from "../../../../../components/menu/menu";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CardDetail from "../../../../../components/cards/cardDetails/cardDetail";

function RecordDetailPaciente() {
  const { id } = useParams();
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
      presciption: "7 pastilla cada 12h, por 7 días",
    },
    {
      id: 3,
      title: "48",
      date: "05/20/24",
      time: "14:30",
      presciption: "10 pastilla cada 12h, por 10 días",
    },
  ];

  useEffect(() => {
    const card = Data.find((item) => item.id === parseInt(id));
    setSelectedCard(card);
  }, [id]);


  
  return (
    <section className="PadreHomeUser">
      <Navbar />
      <div className="UserHome">
        <div className="left-container-user">
          <div className="pacienteContainer">
            <h1>Detalle de la Cita</h1>
            <div className="card-style-mt">
              {selectedCard && (
                <>
                  <CardDetail
                    key={selectedCard.id}
                    title={selectedCard.title}
                    date={selectedCard.date}
                    time={selectedCard.time}
                    presciption={selectedCard.presciption}
                    isSelected={true}
                  />
                </>
              )}
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

export default RecordDetailPaciente;
