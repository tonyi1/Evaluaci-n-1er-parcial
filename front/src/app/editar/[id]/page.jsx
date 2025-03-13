"use client";
import { useState, useEffect } from "react";
import { editarUsuario } from "@/api/peticiones";
import { useParams, useRouter } from "next/navigation"; // Importa useRouter

export default function EditarUsuario({ datos }) {
    const { id } = useParams(); // Extraer el id desde la URL
    const router = useRouter(); // Instancia de useRouter

    const [usuario, setUsuario] = useState({
        username: "",  
        email: "",
        password: "",
        tipoUsuario: "",
    });

    useEffect(() => {
        if (datos) {
            setUsuario({
                username: datos.username || "",
                email: datos.email || "",
                password: datos.password || "",
                tipoUsuario: datos.tipoUsuario || "",
            });
        }
    }, [datos]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setUsuario((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const manejarEdicion = async (e) => {
        e.preventDefault();
        try {
            console.log("Enviando datos:", usuario);
            const response = await editarUsuario(datos._id, usuario);
            console.log("Respuesta de la API:", response);
            alert("Usuario editado con éxito");
            router.push("/administradores"); // Redirige a la página de administradores
        } catch (error) {
            console.error("Error al editar usuario:", error);
            alert("Hubo un error al editar el usuario.");
        }
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh", padding: "20px" }}>
            <h1 style={{ marginBottom: "20px", color: "#333" }}>Editar Usuario</h1>
            <form
                onSubmit={manejarEdicion}
                style={{
                    backgroundColor: "#f4f4f4",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    width: "80%",
                    maxWidth: "400px",
                    textAlign: "center",
                }}
            >
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="username" style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Nombre:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={usuario.username}
                        onChange={manejarCambio}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            fontSize: "14px",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="email" style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Correo:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={usuario.email}
                        onChange={manejarCambio}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            fontSize: "14px",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="password" style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={usuario.password}
                        onChange={manejarCambio}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            fontSize: "14px",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="tipoUsuario" style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Tipo de Usuario:</label>
                    <select
                        id="tipoUsuario"
                        name="tipoUsuario"
                        value={usuario.tipoUsuario}
                        onChange={manejarCambio}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            fontSize: "14px",
                        }}
                    >
                        <option value="">Selecciona el tipo de usuario</option>
                        <option value="admin">Administrador</option>
                        <option value="usuario">Usuario Normal</option>
                    </select>
                </div>

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
}
