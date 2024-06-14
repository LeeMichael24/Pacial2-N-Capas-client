import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import "./register.css";

function Register() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRegisterClick = async (event) => {
    event.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!_#$]).{8,32}$/;

    if (!passwordRegex.test(password)) {
      toast.error("Mal formato de contraseña");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registro exitoso!");
        navigate("/login"); // Cambia '/login' por la ruta a la que deseas redirigir después del registro
      } else {
        throw new Error(data.message || "Error al registrarse");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const reHandleLoginClick = (event) => {
    event.preventDefault();
    navigate("/login"); // Navegar a la ruta de login
  };

  return (
    <section className="sectionPadre">
      <div className="divRegister">
        <h1 className="h1Register">Registro Parcial 2</h1>
        <form>
          <ToastContainer />
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-Username"
              label="Username"
              className="textFieldRegister"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              id="outlined-Email"
              label="Email"
              className="textFieldRegister"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              id="outlined-password"
              label="Password"
              type="password"
              className="textFieldRegister"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              className="btnRegister"
              onClick={handleRegisterClick}
              sx={{ mt: 2 }}
            >
              Register
            </Button>
            <h2 className="h2Register">or</h2>
            <Button
              variant="contained"
              color="secondary"
              className="btnRegister"
              onClick={reHandleLoginClick}
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </Box>
        </form>
      </div>
    </section>
  );
}

export default Register;
