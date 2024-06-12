import "./register.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRegisterClick = (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!_#$]).{8,32}$/;

    if (!passwordRegex.test(password)) {
      toast.error("Mal formato");
    } else {
      toast.success("Registro exitoso!");
    }
  };

  const reHandleLoginClick = (event) => {
    event.preventDefault();
    navigate('/login'); // Navegar a la ruta de login
  };

  return (
    <section className="sectionPadre">
      <div className="divRegister">
        <h1 className="h1Register">Registro Parcial 2</h1>
        <form>
          <ToastContainer />
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
                id="outlined-Username"
                label="Username"
                className="textFieldRegister"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
            </div>
            <div>
              <TextField
                id="outlined-Email"
                label="Email"
                className="textFieldRegister"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </div>
            <div>
              <TextField
                id="outlined-password"
                label="Password"
                type="password"
                className="textFieldRegister"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </div>
          </Box>
          <button className="btnRegister" onClick={handleRegisterClick}>
            Register
          </button>
          <h2 className="h2Register">or</h2>
          <button className="btnRegister" onClick={reHandleLoginClick}>
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Register;
