"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { obtenerAdministradores } from "@/api/peticiones";

export default function Administradores() {
    const [admin, setAdmin] = useState([]);
    const router = useRouter();



    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Administradores</h1>
            <ul>
                {admin.map((admin) => (
                    <li key={admin._id}>{admin.nombre}</li>
                ))}
            </ul>
            
            {/* Botones de navegación */}
            <div style={{ marginTop: "20px" }}>
                <button 
                    style={{ margin: "5px", padding: "10px 15px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                    onClick={() => router.push("/mostrarUsuarios")}
                >
                    Mostrar Usuarios
                </button>
                <button 
                    style={{ margin: "5px", padding: "10px 15px", backgroundColor: "#d9534f", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                    onClick={() => router.push("/login")}
                >
                    Cerrar Sesión
                </button>
                <button 
                    style={{ margin: "5px", padding: "10px 15px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                    onClick={() => router.push("/perfil")}
                >
                    Ir a Perfil
                </button>
            </div>
        </div>
    );
}
