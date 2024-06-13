import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/navbar/navbar';
import Menu from '../../components/menu/menu';
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import './assistantHome.css';

const AssistantHome = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const buttons = [
    { icon: <LogoutRoundedIcon />, name: "Cerrar sesión", path: "/login" },
  ];

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/appointment/approve', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Error fetching appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleApproveAppointment = async (appointmentId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/appointment/approve', {
        appointment: appointmentId,
        approved: true,
        startHour: null, // Coloca aquí la hora de inicio si es necesario
        estimatedTime: null, // Coloca aquí el tiempo estimado si es necesario
        doctorsSpecialities: [], // Coloca aquí los doctores y especialidades si es necesario
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Appointment approved successfully:', response);
      toast.success('Cita médica aprobada exitosamente');
      // Actualizar la lista de citas después de la aprobación
      setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
    } catch (error) {
      console.error('Error approving appointment:', error);
      toast.error('Error al aprobar la cita médica');
      setError('Error al aprobar la cita médica');
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
          {loading && <p>Cargando...</p>}
          {error && <p>{error}</p>}
          <div className="appointment-list">
            {appointments.map(appointment => (
              <div key={appointment.id} className="appointment-item">
                <p><strong>ID de Cita:</strong> {appointment.id}</p>
                <p><strong>Fecha:</strong> {appointment.date}</p>
                <p><strong>Descripción:</strong> {appointment.description}</p>
                <button onClick={() => handleApproveAppointment(appointment.id)} disabled={loading}>
                  {loading ? 'Aprobando...' : 'Aprobar Cita'}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="right-container-user">
          <Menu buttons={buttons} />
        </div>
      </div>
    </section>
  );
};

export default AssistantHome;
