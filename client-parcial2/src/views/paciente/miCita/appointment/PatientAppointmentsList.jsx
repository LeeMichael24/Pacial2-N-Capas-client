import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PatientAppointmentsList.css";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, [status]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/appointment/own`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            status: status || undefined,
          },
        }
      );
      setAppointments(response.data.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Error fetching appointments");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Tus Citas Médicas</h1>
      <label>
        Filtrar por estado:
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Estado de la cita"
        />
      </label>
      {loading ? (
        <p>Cargando citas...</p>
      ) : (
        <div className="appointment-list">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div key={appointment.id} className="appointment-item">
                <p>
                  <strong>Fecha solicitada:</strong>{" "}
                  {new Date(appointment.requestedDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Comentario:</strong> {appointment.commentary}
                </p>
                <p>
                  <strong>Estado:</strong> {appointment.status}
                </p>
                {appointment.prescriptions &&
                  appointment.prescriptions.length > 0 && (
                    <div>
                      <strong>Prescripciones:</strong>
                      <ul>
                        {appointment.prescriptions.map(
                          (prescription, index) => (
                            <li key={index}>{prescription.description}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            ))
          ) : (
            <p>No tienes citas médicas.</p>
          )}
        </div>
      )}
    </>
  );
};

export default PatientAppointments;
