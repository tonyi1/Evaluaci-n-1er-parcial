"use client";
import { useEffect, useState } from "react";
import { obtenerUsuarioPorId } from "@/api/peticiones";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export default function Perfil() {
    const [usuario, setUsuario] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const cargarUsuario = async () => {
            try {
                const obtenerCookie = (nombre) => {
                    const valor = `; ${document.cookie}`;
                    const partes = valor.split(`; ${nombre}=`);
                    if (partes.length === 2) return partes.pop().split(";").shift();
                };
                const token = obtenerCookie("token");
                if (!token) {
                    alert("No se encontró un token válido. Redirigiendo a login.");
                    router.push("/login");
                    return;
                }

                const decoded = jwtDecode(token);
                const usuarioId = decoded.id;
                console.log(usuarioId);
                const usuarioData = await obtenerUsuarioPorId(usuarioId);
                setUsuario(usuarioData.data);
            } catch (error) {
                console.error("Error al obtener usuario:", error);
                alert("No se pudo cargar la información del usuario");
            }
        };
        cargarUsuario();
    }, [router]);

    if (!usuario) {
        return <p style={loadingStyles}>Cargando...</p>;
    }

    return (
        <div style={perfilContainer}>
            <h1 style={titleStyles}>Perfil</h1>
            <h2 style={subtitleStyles}>Detalles del Usuario</h2>
            <div style={userInfoContainer}>
                <p style={userInfoText}><strong>Nombre de usuario:</strong> {usuario.username}</p>
                <p style={userInfoText}><strong>Correo:</strong> {usuario.email}</p>
                <p style={userInfoText}><strong>Tipo:</strong> {usuario.tipoUsuario}</p>
            </div>
        </div>
    );
}

// Estilos
const perfilContainer = {
    textAlign: "center",
    marginTop: "50px",
    padding: "20px",
    backgroundColor: "#f4f7fc",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
};

const titleStyles = {
    fontSize: "2.5rem",
    color: "#333",
    fontWeight: "bold",
    marginBottom: "20px",
};

const subtitleStyles = {
    fontSize: "1.8rem",
    color: "#555",
    marginBottom: "20px",
};

const userInfoContainer = {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
};

const userInfoText = {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "10px",
};

const loadingStyles = {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "1.5rem",
    color: "#999",
};
