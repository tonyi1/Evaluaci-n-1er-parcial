"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { obtenerTodosLosUsuarios, borrarUsuario } from "@/api/peticiones";

export default function MostrarUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [admins, setAdmins] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const usuarios = await obtenerTodosLosUsuarios();
                console.log("📢 Usuarios obtenidos correctamente:", usuarios); // Verifica si se están obteniendo
                setUsuarios(usuarios);  // 🔹 Asegúrate de que `setUsuarios` usa la lista correcta
            } catch (error) {
                console.error("Error al cargar usuarios:", error);
            }
        };
        cargarDatos();
    }, []);
    
    

    const editarUsuario = (id) => {
        router.push(`/editar/${id}`);
    };

    const eliminarUsuario = async (id) => {
        if (confirm("¿Estás seguro de eliminar este usuario?")) {
            try {
                await borrarUsuario(id);
                alert("Usuario eliminado");

                // Actualizar la lista sin recargar la página
                setUsuarios((prevUsuarios) => prevUsuarios.filter((u) => u._id !== id));
                setAdmins((prevAdmins) => prevAdmins.filter((a) => a._id !== id));
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
                alert("No se pudo eliminar el usuario");
            }
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Lista de Usuarios</h1>

            {/* Usuarios */}
            <h2>Usuarios</h2>
            {usuarios.length > 0 ? (
                <table style={{ width: "80%", margin: "auto", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#0070f3", color: "white" }}>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Nombre</th>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Tipo</th>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Editar</th>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario._id} style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{usuario.id}</td>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{usuario.nombre}</td>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{usuario.correo}</td>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{usuario.tipo}</td>
                                <td>
                                    <button 
                                        style={{ padding: "5px 10px", backgroundColor: "#f0ad4e", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                                        
                                        onClick={() => editarUsuario(usuario.id)}
                                    >
                                        Editar
                                    </button>
                                </td>
                                <td>
                                    <button 
                                        style={{ padding: "5px 10px", backgroundColor: "#d9534f", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                                        onClick={() => eliminarUsuario(usuario.id)}
                                    >
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay usuarios disponibles</p>
            )}

            

            {/* Botones de navegación */}
            <div style={{ marginTop: "20px" }}>
                <button 
                    style={{ margin: "5px", padding: "10px 15px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                    onClick={() => router.push("/registro")}
                >
                    Registrar Usuario
                </button>
                <button 
                    style={{ margin: "5px", padding: "10px 15px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                    onClick={() => router.push("/admin")}
                >
                    Volver a Administradores
                </button>
            </div>
        </div>
    );
}
