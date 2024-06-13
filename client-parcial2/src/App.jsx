<<<<<<< HEAD
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/layout'
import Missing from './components/missing/missing'
import Login from './components/login/login'
import Register from './components/register/register'
import HomeUser from './views/user/HomeUser'
import PacienteHome from './views/paciente/pacienteHome'
import CrearCitaPaciente from './views/paciente/crearCita/crearCitaPaciente'
import RecordPaciente from './views/paciente/crearCita/recordPaciente/recordPaciente'
import RecordDetailPaciente from './views/paciente/crearCita/recordPaciente/recordDetailPaciente/recordDetailPaciente'
import DoctorHome from './views/doctor/doctorHome'
import PrescriptionPerId from './views/doctor/prescriptionPerId/prescriptionPerId'
import AppointmentList from './views/doctor/appointmentList/apointmentList'
import AppointmentDetail from './views/doctor/appointmentList/appointmentDetail/AppointmentDetail'
import CrearCitaDoc from './views/doctor/crearCitaDoc/crearCitaDoc'
=======
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
>>>>>>> 2596d2d76282aba352f5ed1a33d8a32761358d7f

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

<<<<<<< HEAD
          {/* doctor */}
          <Route path="/doctorHome" element={<DoctorHome />} />
          <Route path="/doctorHome/crearCita" element={<CrearCitaDoc />} />
          <Route path="/doctorHome/appointmentList" element={<AppointmentList />} />
          <Route path="/doctorHome/appointmentList/:id" element={<AppointmentDetail />} />
=======
            {/* Doctor */}
            <Route element={<PrivateRoute requiredRole="DOCTOR" />}>
              <Route path="/doctorHome" element={<DoctorHome />} />
            </Route>
>>>>>>> 2596d2d76282aba352f5ed1a33d8a32761358d7f

            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
