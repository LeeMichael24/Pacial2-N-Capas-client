import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./appointmentDetail.css"; // Ajustar nombre del archivo de estilos si es necesario

function AppointmentDetail() {
  const { appointmentId } = useParams(); // Asegúrate de que coincida con el parámetro de la ruta
  const [newPrescription, setNewPrescription] = useState([
    {
      medicine: "",
      dose: "",
      ffin: "",
    },
  ]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    setNewPrescription((prev) => {
      const updatedPrescriptions = [...prev];
      updatedPrescriptions[index][name] = value;
      return updatedPrescriptions;
    });
  };

  const handleAddPrescription = async (event) => {
    event.preventDefault();
    const requestData = {
      citaMedicaId: appointmentId,
      prescripciones: newPrescription,
    };

    try {
      const response = await fetch("http://localhost:8080/api/clinic/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      // Aquí puedes manejar la respuesta, por ejemplo, limpiando el formulario o mostrando un mensaje de éxito
      setNewPrescription([
        {
          medicine: "",
          dose: "",
          ffin: "",
        },
      ]);
    } catch (error) {
      console.error("Error adding prescription:", error);
    }
  };

  const handleAddNewField = () => {
    setNewPrescription((prev) => [
      ...prev,
      {
        medicine: "",
        dose: "",
        ffin: "",
      },
    ]);
  };

  return (
    <div className="appointment-detail">
      <h2>Agregar Prescripción</h2>
      <form onSubmit={handleAddPrescription}>
        {newPrescription.map((prescription, index) => (
          <div key={index}>
            <label>
              Medicamento:
              <input
                type="text"
                name="medicine"
                value={prescription.medicine}
                onChange={(e) => handleInputChange(index, e)}
              />
            </label>
            <label>
              Dosis:
              <input
                type="text"
                name="dose"
                value={prescription.dose}
                onChange={(e) => handleInputChange(index, e)}
              />
            </label>
            <label>
              Fecha de Fin:
              <input
                type="date"
                name="ffin"
                value={prescription.ffin}
                onChange={(e) => handleInputChange(index, e)}
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={handleAddNewField}>
          Agregar otra prescripción
        </button>
        <button type="submit">Enviar Prescripciones</button>
      </form>
    </div>
  );
}

export default AppointmentDetail;
