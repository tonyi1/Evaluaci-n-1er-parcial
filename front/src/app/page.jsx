"use client";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ marginBottom: "20px" }}>Bienvenido a la Plataforma</h1>
            <p style={{ marginBottom: "30px", fontSize: "18px" }}>Inicia sesión o regístrate para continuar.</p>
            
            <div style={{ display: "flex", gap: "20px", flexDirection: "row" }}>
                <button 
                    style={{ 
                        padding: "10px 20px", 
                        fontSize: "16px", 
                        backgroundColor: "#0070f3", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "5px", 
                        cursor: "pointer", 
                        width: "180px" 
                    }}
                    onClick={() => router.push("/login")}
                >
                    Iniciar Sesión
                </button>
                
                <button 
                    style={{ 
                        padding: "10px 20px", 
                        fontSize: "16px", 
                        backgroundColor: "#28a745", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "5px", 
                        cursor: "pointer", 
                        width: "180px" 
                    }}
                    onClick={() => router.push("/registro")}
                >
                    Registrarse
                </button>
            </div>
        </div>
    );
}
