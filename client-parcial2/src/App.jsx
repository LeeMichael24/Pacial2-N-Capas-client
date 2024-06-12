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

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />

          {/* Rutas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={ <Register />} />

          {/* User */}
          <Route path="/homeUser" element={<HomeUser />} />

          {/* Paciente */}
          <Route path="/paciente" element={<PacienteHome />} />
          <Route path="/paciente/crearCitaMedica" element={<CrearCitaPaciente />} />
          {/* TODO: */}
          <Route path="/paciente/misCitasRecord" element={<RecordPaciente />} />
          <Route path="/paciente/misCitasRecord/:id" element={<RecordDetailPaciente />} />
          {/* <Route path="/paciente/misPrescipciones" element={<PacienteHome />} /> */}


          <Route path='*' element={<Missing />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
