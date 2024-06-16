import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

// Iconos
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Navbar from "../../../components/navbar/navbar";
import Menu from "../../../components/menu/menu";


function FinalizarCita() {
    const [appointments, setAppointments] = useState([]);
    const [filter, setFilter] = useState("all");
    const [appDate, setAppDate] = useState(""); // Estado para la fecha de la cita
    const [appointmentId, setAppointmentId] = useState(""); // Estado para el ID de la cita a finalizar
    const navigate = useNavigate();

    const buttons = [
        {
            icon: <TextSnippetIcon />,
            name: "Inicio",
            path: "/doctorHome",
        },
        {
            icon: <FormatListBulletedIcon />,
            name: "Record de pacientes",
            path: "/doctorHome/crearRecord",
        },
        {
            icon: <PlaylistAddCircleIcon />,
            name: "Agregar Prescripción",
            path: "/doctorHome/appointmentList",
        },
        {
            icon: <ContentPasteSearchIcon />,
            name: "Buscar Prescripción",
            path: "/doctorHome/prescriptionPerId",
        },
        {
            icon: <AssignmentTurnedInIcon />,
            name: "Finalizar cita",
            path: "/doctorHome/finalizarCita",
        },

        { icon: <LogoutRoundedIcon />, name: "Cerrar sesión", path: "/login" },
    ];



    const fetchAppointments = async (date = "") => {
        try {
            const response = await fetch(`http://localhost:8080/api/clinic/schedule1${date ? `?appDate=${date}` : ""}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            setAppointments(data.data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleDateChange = (event) => {
        setAppDate(event.target.value);
    };

    const handleSearchClick = () => {
        fetchAppointments(appDate);
    };

    const handleAppointmentIdChange = (event) => {
        setAppointmentId(event.target.value);
    };

    const handleFinishAppointmentClick = async () => {
        try {
            const response = await fetch("http://localhost:8080/appointment/finish", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ appointment: appointmentId }),
            });
            if (response.ok) {
                alert("Cita finalizada con éxito");
                fetchAppointments(); // Actualizar la lista de citas después de finalizar una
            } else {
                alert("Error al finalizar la cita");
            }
        } catch (error) {
            console.error("Error finalizing appointment:", error);
            alert("Error al finalizar la cita");
        }
    };

    const filteredAppointments = appointments.filter((appointment) => {
        if (filter === "finished") {
            return appointment.status === "Finalizado";
        } else if (filter === "available") {
            return appointment.status !== "Finalizado";
        }
        return true;
    });

    return (
        <section className="PadreHomeUser">
            <Navbar />
            <div className="UserHome">
                <div className="left-container-user leftDoctor">
                    <div className="appointment-list">
                        <h2 className="h2List">Listado de Citas</h2>
                        <ul>
                            {filteredAppointments.map((appointment) => (
                                <li key={appointment.id}>
                                    <div
                                        className={`appointment-item ${appointment.status === "Finalizado" ? "finished" : "available"}`}
                                    >
                                        <div>
                                            <h3> Paciente: {appointment.user.name}</h3>
                                            <p>ID de la cita :{appointment.id}</p>
                                            <p>Fecha Solicitada: {appointment.requestedDate}</p>
                                            <p>Comentario: {appointment.commentary}</p>
                                            <p>Estado: {appointment.status}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Agregar campo de entrada para la fecha y botón de búsqueda */}
                    <div className="search-container">
                        <h2 className="h2List">Buscar Citas por Fecha</h2>
                        <div className="adentro2">
                            <input
                                type="date"
                                value={appDate}
                                onChange={handleDateChange}
                                placeholder="Ingrese la fecha de la cita"
                            />
                            <button className="boton" onClick={handleSearchClick}>Buscar</button>
                        </div>
                    </div>

                    {/* Agregar campo de entrada para el ID de la cita y botón para finalizar */}
                    <div className="finish-container">
                        <h2 className="h2List">Finalizar Cita</h2>
                        <div className="adentro2">
                            <input
                                type="text"
                                value={appointmentId}
                                onChange={handleAppointmentIdChange}
                                placeholder="Ingrese el ID de la cita"
                            />
                            <button className="boton" onClick={handleFinishAppointmentClick}>Finalizar</button>
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

export default FinalizarCita;
