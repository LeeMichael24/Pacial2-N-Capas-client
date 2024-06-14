
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
import AppointmentList from './views/doctor/appointmentList/apointmentList'
import AppointmentDetail from './views/doctor/appointmentList/appointmentDetail/AppointmentDetail'
import CrearCitaDoc from './views/doctor/crearCitaDoc/crearCitaDoc'
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthProvider';
import PrescriptionPerId from './views/doctor/prescriptionPerId/prescriptionPerId';
import Admin from "./views/admin/admin";


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
            {/* <Route element={<PrivateRoute allowedRoles={['SUDO', 'ASST', 'DOCT', 'PSNT']} />}>
            
            </Route> */}
            <Route path="/dashboard" element={<HomeUser />} />

            {/* Paciente */}
            <Route element={<PrivateRoute allowedRoles={['PSNT']} />}>
              <Route path="/paciente" element={<PacienteHome />} />
              <Route
                path="/paciente/appointment/request"
                element={<CrearCitaPaciente />}
              />
              <Route
                path="/paciente/user/record"
                element={<RecordPaciente />}
              />
              <Route
                path="/paciente/user/record/:id"
                element={<RecordDetailPaciente />}
              />
            </Route>

            {/* Admin */}
            <Route element={<PrivateRoute allowedRoles={['SUDO']} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>

            {/* doctor */}
            <Route element={<PrivateRoute allowedRoles={['DOCT']} />}> 
              <Route path="/doctorHome" element={<DoctorHome />} />
              <Route path="/doctorHome/crearCita" element={<CrearCitaDoc />} />
              <Route path="/doctorHome/appointmentList" element={<AppointmentList />} />
              <Route path="/doctorHome/appointmentDetail/:appointmentId" element={<AppointmentDetail />} />
              <Route path="/doctorHome/prescriptionPerId" element={< PrescriptionPerId/>} />
             </Route> 


            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
