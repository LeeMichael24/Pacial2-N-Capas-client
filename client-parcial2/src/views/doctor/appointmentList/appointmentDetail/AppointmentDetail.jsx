import { useState } from "react";
import "./appointmentDetail.css"; // Importa los estilos CSS
import Navbar from "../../../../components/navbar/navbar";
import Menu from "../../../../components/menu/menu";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

// Datos simulados de la cita
const appointmentData = {
  id: 1,
  description: "Consulta General",
  date: "2024-06-20",
  patient: "Juan Pérez",
  doctor: "Dr. Smith",
  symptoms: "Dolor de cabeza severo",
};

function AppointmentDetail() {
  const [medicine, setMedicine] = useState("");
  const [dose, setDose] = useState("");
  const [ffin, setFfin] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);

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
      name: "Prescripciones médicas",
      path: "/paciente/misPrescripciones",
    },
    { icon: <LogoutRoundedIcon />, name: "Cerrar sesión", path: "/login" },
  ];

  const handleAddPrescription = (event) => {
    event.preventDefault();

    if (!medicine || !dose || !ffin) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const newPrescription = {
      medicine,
      dose,
      ffin,
    };

    setPrescriptions([...prescriptions, newPrescription]);
    setMedicine("");
    setDose("");
    setFfin("");
  };

  return (
    <section className="PadreHomeUser">
      <Navbar />
      <div className="UserHome">
        <div className="left-container-user leftDoctor">
          <div className="appointment-detail">
            <h2>Detalles de la Cita</h2>
            <div className="details">
              <p>
                <span className="label">ID de Cita:</span> {appointmentData.id}
              </p>
              <p>
                <span className="label">Descripción:</span>{" "}
                {appointmentData.description}
              </p>
              <p>
                <span className="label">Fecha:</span> {appointmentData.date}
              </p>
              <p>
                <span className="label">Paciente:</span>{" "}
                {appointmentData.patient}
              </p>
              <p>
                <span className="label">Médico:</span> {appointmentData.doctor}
              </p>
              <p>
                <span className="label">Síntomas:</span>{" "}
                {appointmentData.symptoms}
              </p>
            </div>
            <div className="prescriptions">
              <h3>Agregar Prescripción Médica</h3>
              <ul>
                {prescriptions.map((prescription, index) => (
                  <li key={index}>
                    <p>
                      <span className="label">Medicina:</span>{" "}
                      {prescription.medicine}
                    </p>
                    <p>
                      <span className="label">Dosis:</span> {prescription.dose}
                    </p>
                    <p>
                      <span className="label">Fecha de Finalización:</span>{" "}
                      {prescription.ffin}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <form onSubmit={handleAddPrescription}>
              <label>
                <span className="label">Medicina:</span>
                <input
                  type="text"
                  value={medicine}
                  onChange={(e) => setMedicine(e.target.value)}
                  required
                />
              </label>
              <label>
                <span className="label">Dosis:</span>
                <input
                  type="text"
                  value={dose}
                  onChange={(e) => setDose(e.target.value)}
                  required
                />
              </label>
              <label>
                <span className="label">Fecha de Finalización:</span>
                <input
                  type="date"
                  value={ffin}
                  onChange={(e) => setFfin(e.target.value)}
                  required
                />
              </label>
            </form>
            <button type="submit">Agregar Prescripción</button>
          </div>
        </div>
        <div className="right-container-user">
          <Menu buttons={buttons} />
        </div>
      </div>
    </section>
  );
}

export default AppointmentDetail;
