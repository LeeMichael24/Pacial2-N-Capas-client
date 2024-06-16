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
import DoctorHome from './views/doctor/doctorHome';
import AppointmentList from './views/doctor/appointmentList/apointmentList'
import AppointmentDetail from './views/doctor/appointmentList/appointmentDetail/AppointmentDetail'
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthProvider';
import PrescriptionPerId from './views/doctor/prescriptionPerId/prescriptionPerId';
import Admin from "./views/admin/admin";
import AssistantHome from "./views/secretaria/assistantHome";
import CrearRecordAssit from './views/secretaria/crearRecordAsst/crearRecordAssit';
import FinalizarCita from './views/doctor/finalizarCita/finalizarCita';



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
            </Route>


            {/* ASISTANT */}
            <Route path="/asistant" element={<AssistantHome />} />
            <Route
                path="/asistant/user/record"
                element={<CrearRecordAssit />}
            />



            {/* <Route element={<PrivateRoute allowedRoles={['DOCT']} />}> */}
            {/* Admin */}
            <Route element={<PrivateRoute allowedRoles={['SUDO']} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>

            {/* doctor */}
            <Route element={<PrivateRoute allowedRoles={['DOCT']} />}> 
              <Route path="/doctorHome" element={<DoctorHome />} />
              <Route path="/doctorHome/appointmentList" element={<AppointmentList />} />
              <Route path="/doctorHome/appointmentDetail/:appointmentId" element={<AppointmentDetail />} />
              <Route path="/doctorHome/prescriptionPerId" element={<PrescriptionPerId />} />
              <Route path="/doctorHome/finalizarCita" element={<FinalizarCita />} />
              </Route> 



            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
