import "./login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [identifier, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
  
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!_#$]).{8,32}$/;
  
    if (!passwordRegex.test(password)) {
      toast.error("Mal formato");
    } else {
      try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier, 
            password,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Guardar el token en el almacenamiento local o cookies
          localStorage.setItem('token', data.token);
  
          toast.success("Login exitoso!");
          navigate('/homeUser'); // O redirigir basado en el token recibido
        } else {
          throw new Error(data.message || "Error al iniciar sesión");
        }
      } catch (error) {
        toast.error(error.message);
      }
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
                value={identifier}
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
