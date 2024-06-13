import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/layout';
import Missing from './components/missing/missing';
import Login from './components/login/login';
import Register from './components/register/register';
import HomeUser from './views/user/HomeUser';
import PacienteHome from './views/paciente/pacienteHome';
import CrearCitaPaciente from './views/paciente/crearCita/crearCitaPaciente';
import RecordPaciente from './views/paciente/crearCita/recordPaciente/recordPaciente';
import RecordDetailPaciente from './views/paciente/crearCita/recordPaciente/recordDetailPaciente/recordDetailPaciente';
import DoctorHome from './views/doctor/doctorHome';

import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />

            {/* Rutas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* User */}
            <Route element={<PrivateRoute allowedRoles={['SUDO', 'ASST', 'DOCT', 'PSNT']} />}>
            <Route path="/dashboard" element={<HomeUser />} />
            </Route>

            {/* Paciente */}
            <Route element={<PrivateRoute requiredRole="USER" />}>
              <Route path="/paciente" element={<PacienteHome />} />
              <Route path="/paciente/appointment/request" element={<CrearCitaPaciente />} />
              <Route path="/paciente/user/record" element={<RecordPaciente />} />
              <Route path="/paciente/user/record/:id" element={<RecordDetailPaciente />} />
            </Route>

            {/* Doctor */}
            <Route element={<PrivateRoute requiredRole="DOCTOR" />}>
              <Route path="/doctorHome" element={<DoctorHome />} />
            </Route>

            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
