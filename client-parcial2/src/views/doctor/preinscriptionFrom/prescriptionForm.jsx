import "./prescriptionForm.css";
import { useState } from "react";

function PrescriptionForm() {
  const [appointmentDetails, setAppointmentDetails] = useState({
    doctor: "Dr. Smith",
    date: "2024-06-12",
    time: "10:00",
  });

  const [prescriptions, setPrescriptions] = useState([
    { medicamento: "Ibuprofeno", dosis: "200mg", fechaDeFin: "2024-06-19" },
  ]);

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePrescriptionChange = (index, e) => {
    const { name, value } = e.target;
    setPrescriptions((prevPrescriptions) => {
      const newPrescriptions = [...prevPrescriptions];
      newPrescriptions[index][name] = value;
      return newPrescriptions;
    });
  };

  const addPrescription = () => {
    setPrescriptions((prevPrescriptions) => [
      ...prevPrescriptions,
      { medicamento: "", dosis: "", fechaDeFin: "" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      appointmentDetails,
      prescriptions,
    };
    console.log("Data to be sent:", data);
  };

  return (
    <form className="prescription-form" onSubmit={handleSubmit}>
      <h1>Crear Cita Médica y Prescripciones</h1>

      <div className="form-group">
        <label>Doctor</label>
        <input
          type="text"
          name="doctor"
          value={appointmentDetails.doctor}
          onChange={handleAppointmentChange}
        />
      </div>

      <div className="form-group">
        <label>Fecha de la cita</label>
        <input
          type="date"
          name="date"
          value={appointmentDetails.date}
          onChange={handleAppointmentChange}
        />
      </div>

      <div className="form-group">
        <label>Hora de la cita</label>
        <input
          type="time"
          name="time"
          value={appointmentDetails.time}
          onChange={handleAppointmentChange}
        />
      </div>

      <h2>Prescripciones</h2>
      {prescriptions.map((prescription, index) => (
        <div key={index} className="prescription-group">
          <div className="form-group">
            <label>Medicamento</label>
            <input
              type="text"
              name="medicamento"
              value={prescription.medicamento}
              onChange={(e) => handlePrescriptionChange(index, e)}
            />
          </div>
          <div className="form-group">
            <label>Dosis</label>
            <input
              type="text"
              name="dosis"
              value={prescription.dosis}
              onChange={(e) => handlePrescriptionChange(index, e)}
            />
          </div>
          <div className="form-group">
            <label>Fecha de fin</label>
            <input
              type="date"
              name="fechaDeFin"
              value={prescription.fechaDeFin}
              onChange={(e) => handlePrescriptionChange(index, e)}
            />
          </div>
        </div>
      ))}

      <button type="button" onClick={addPrescription}>
        Añadir otra prescripción
      </button>

      <button type="submit">Enviar</button>
    </form>
  );
}

export default PrescriptionForm;
