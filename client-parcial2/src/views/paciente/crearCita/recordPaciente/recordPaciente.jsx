import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../../components/navbar/navbar';
import Menu from '../../../../components/menu/menu';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './recordPaciente.css';

function RecordPaciente() {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const buttons = [
    {
      icon: <LogoutRoundedIcon />,
      name: 'Record médico',
      path: '/paciente/user/record',
    },
    {
      icon: <LogoutRoundedIcon />,
      name: "Mis Citas",
      path: "/paciente/appointment/own",
    },
    { icon: <LogoutRoundedIcon />, name: 'Cerrar sesión', path: '/login' },
  ];

  useEffect(() => {
    fetchHistorial();
  }, []);

  const fetchHistorial = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/user/record', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          startDate: startDate || undefined,
          endDate: endDate || undefined,
        },
      });
      setHistorial(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
      toast.error(`: ${error.response ? error.response.data.message : error.message}`);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); //agregamos para que no envie el mensaje de error y pueda actualizar
    setLoading(true);
    fetchHistorial();
  };

  return (
    <section className="PadreHomeUser">
      <Navbar />
      <ToastContainer />
      <div className="UserHome">
        <div className="left-container-user">
          <div className="pacienteContainer">
            <h1>Mi Record Citas Médicas</h1>
            <form onSubmit={handleSubmit} className="date-form">
              <label>
                Fecha de Inicio:
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>
              <label>
                Fecha de Fin:
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
              <button type="submit">Buscar</button>
            </form>
            {loading ? (
              <p>Cargando...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : historial.length === 0 ? (
              <p>No hay registros.</p>
            ) : (
              <div className="card-style-mt">
                {historial.map((item) => (
                  <div key={item.id} className="historial-card">
                    <h3>Historial ID: {item.id}</h3>
                    <p>Fecha: {new Date(item.date).toLocaleDateString()}</p>
                    <p>Comentario: {item.comment}</p>
                    
                  </div>
                ))}
              </div>
            )}
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
