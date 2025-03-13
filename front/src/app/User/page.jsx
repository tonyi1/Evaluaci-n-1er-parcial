"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Usuario() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login"); 
  };
  
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Hola, Usuario Normal</h1>

      {/* Botones para funcionalidades */}
      <div style={{ marginTop: "20px" }}>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            margin: "10px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => router.push("/perfil")} // Redirige a la página de perfil
        >
          Ver Perfil
        </button>

        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            margin: "10px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleLogout} // Redirige directamente a login
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
