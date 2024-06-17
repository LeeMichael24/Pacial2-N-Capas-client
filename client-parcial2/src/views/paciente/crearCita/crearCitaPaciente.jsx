import Navbar from "../../../components/navbar/navbar";
import Menu from "../../../components/menu/menu";
/* import { useNavigate } from "react-router-dom"; */
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
/* import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'; */ // Importa el DateTimePicker
import "./crearCitaPaciente.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CrearCitaPaciente() {
    /* const navigate = useNavigate(''); */

    const buttons = [
        {
          icon: <LogoutRoundedIcon />,
          name: "Record médico",
          path: "/paciente/user/record",
        },
        {
          icon: <LogoutRoundedIcon />,
          name: "Mis Citas",
          path: "/paciente/appointment/own",
        },
        { icon: <LogoutRoundedIcon />, name: "Cerrar sesión", path: "/login" },
      ];

  const handlerClick = (e) => {
    e.preventDefault();
    toast.success("Cita creada exitosamente!");
    /* setTimeout(() => {
      navigate("/paciente");
    }, 2000); */
  };






  return (
    <section className="PadreHomeUser">
      <Navbar />
      <ToastContainer />
      <div className="UserHome">
        <div className="left-container-user">
          <h1 className="h1-user">
            Crear Cita Médica
          </h1>
          <div className="containerUserCita">
            <div className="hijoCita">
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "100%" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    id="outlined-comentary"
                    label="Describe your symptoms"
                    type="comentary"
                    className="textFieldLogin"
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-date"
                    label=""
                    type="Date"
                    className="textFieldLogin"
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-date"
                    label=""
                    type="Time"
                    className="textFieldLogin"
                  />
                </div>
              </Box>
              {/* Aquí se integra el DateTimePicker */}
              {/* <DateTimePicker /> */}
              <button className="btnUserHome" onClick={handlerClick}>
                Agendar Cita
              </button>
            </div>
          </div>
        </div>
        <div className="right-container-user">
          <Menu buttons={buttons} />
        </div>
      </div>
    </section>
  );
}

export default CrearCitaPaciente;
