import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/navbar/navbar';
import Menu from '../../components/menu/menu';
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import "./assistantHome.css";

const AssistantHome = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [startHour, setStartHour] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [doctorSpecialities, setDoctorSpecialities] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/appointment/citas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments(response.data.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleApprove = async (appointmentId) => {
    if (!startHour || !estimatedTime || !doctorSpecialities) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }

    const doctorSpecialitiesList = doctorSpecialities.split(",").map((item) => item.trim());

    if (doctorSpecialitiesList.length % 2 !== 0) {
      toast.error("Debe haber igual cantidad de doctores y especialidades.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/appointment/aprove",
        {
          approved: true,
          startHour: startHour,
          estimatedTime: parseInt(estimatedTime),
          doctorsSpecialities: doctorSpecialitiesList,
          appointment: appointmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Cita aprobada exitosamente");
      fetchAppointments();
    } catch (error) {
      console.error("Error approving appointment:", error);
      toast.error("Error al aprobar la cita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="PadreHomeAdmin">
      <Navbar />
      <ToastContainer />
      <div className="UserHome">
        <div className="left-container-user">
          <h1>CITAS MÉDICAS SIN APROBACIÓN</h1>
          <div className="appointment-list">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="appointment-item">
                <p>Comentario: {appointment.commentary}</p>
                <p>Fecha Solicitada: {appointment.requestedDate}</p>
                <button onClick={() => setSelectedAppointment(appointment.id)}>Aprobar</button>
              </div>
            ))}
          </div>
        </div>
        <div className="right-container-user">
          <Menu buttons={[{ icon: <LogoutRoundedIcon />, name: "Cerrar sesión", path: "/login" }]} />
        </div>
      </div>
      {selectedAppointment && (
        <div className="approve-form">
          <h2>Aprobar Cita</h2>
          <label>
            Hora de Inicio:
            <input
              type="time"
              value={startHour}
              onChange={(e) => setStartHour(e.target.value)}
            />
          </label>
          <label>
            Tiempo Estimado (minutos):
            <input
              type="number"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
            />
          </label>
          <label>
            Doctores y Especialidades (formato: doctor1,especialidad1,doctor2,especialidad2):
            <input
              type="text"
              value={doctorSpecialities}
              onChange={(e) => setDoctorSpecialities(e.target.value)}
            />
          </label>
          <button onClick={() => handleApprove(selectedAppointment)} disabled={loading}>
            {loading ? "Aprobando..." : "Aprobar Cita"}
          </button>
        </div>
      )}
    </section>
  );
};

export default AssistantHome;
