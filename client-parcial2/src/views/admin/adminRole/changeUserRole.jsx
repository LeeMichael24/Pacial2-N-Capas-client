import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./changeUserRole.css";


const rolesList = ["SUDO", "ASST", "DOCT", "PSNT"];

const ChangeUserRole = () => {
  const [identifier, setIdentifier] = useState("");
  const [selectedRole, setSelectedRole] = useState(null); // Cambiado a un solo estado para el rol seleccionado
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRoleChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedRole(value); // Actualiza el rol seleccionado
    } else {
      setSelectedRole(null); // Si se desmarca, se limpia el rol seleccionado
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!identifier) {
      alert("Por favor ingresa el identificador de usuario.");
      return;
    }

    if (!selectedRole) {
      alert("Por favor selecciona un rol.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/users/change-roles",
        {
          identifier: identifier,
          roles: [selectedRole], // Enviar solo el rol seleccionado como un array
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Roles actualizados exitosamente:", response);
      toast.success('Roles actualizados exitosamente');
      setIdentifier("");
      setSelectedRole(null);
    } catch (error) {
      console.error("Error al actualizar roles:", error);
      toast.error('Error al actualizar roles');
      setError("Error al actualizar roles");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-role-container">
      <h2>Cambiar Rol de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Identificador del Usuario:
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </label>
        <fieldset>
          <legend>Seleccione el nuevo rol:</legend>
          <div className="divRowRole">
          {rolesList.map((role) => (
            <div key={role} className="roleRow">
              <label>
                <input
                  type="radio"
                  value={role}
                  checked={selectedRole === role}
                  onChange={handleRoleChange}
                />
                {role}
              </label>
            </div>
          ))}
          </div>
        </fieldset>
        <button type="submit" disabled={loading}>
          {loading ? "Actualizando..." : "Actualizar Rol"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ChangeUserRole;
