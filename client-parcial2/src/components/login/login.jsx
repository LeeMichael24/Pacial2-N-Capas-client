import "./login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!_#$]).{8,32}$/;

    if (!passwordRegex.test(password)) {
      toast.error("Mal formato");
    } else {
      toast.success("Login exitoso!");
      navigate('/homeUser');
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate('/register'); // Navegar a la ruta de registro
  };

  return (
    <section className="sectionPadre">
      <div className="divLogin">
        <h1 className="h1Login">Login Parcial 2</h1>
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
                id="outlined-username"
                label="Username or email"
                className="textFieldLogin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
            </div>
            <div>
              <TextField
                id="outlined-password"
                label="Password"
                type="password"
                className="textFieldLogin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </div>
          </Box>
          <button className="btnLogin" onClick={handleLoginClick}>
            Login
          </button>
          <h2 className="h2Login">or</h2>
          <button className="btnLogin" onClick={handleRegisterClick}>
            Register
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
