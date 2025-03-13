"use client";
import { useForm } from "react-hook-form";
import { peticionRegistro } from "@/api/peticiones"; // Aquí estaba mal importado
import { useRouter } from "next/navigation"; // Importa useRouter correctamente

export default function Registro() {
    const { register, handleSubmit } = useForm();
    const router = useRouter(); // Obtén el router para redireccionar

    return (
        <>
            {/* Botón fijo para ir a la página de inicio */}
            <button 
                style={{ 
                    position: "fixed", 
                    top: "20px", 
                    left: "20px", 
                    padding: "10px 15px", 
                    fontSize: "14px", 
                    backgroundColor: "#0070f3", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "5px", 
                    cursor: "pointer" 
                }}
                onClick={() => router.push("/")}
            >
                Ir al Inicio
            </button>

            <main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", padding: "20px" }}>
                <h1 style={{ marginBottom: "20px" }}>Regístrate</h1>
                <form
                    onSubmit={handleSubmit(async (usuario) => {
                        const respuesta = await peticionRegistro(usuario);
                        console.log(respuesta);
                        router.push("/"); // Redirecciona correctamente
                    })}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "10px", // Espaciado entre los campos
                        maxWidth: "400px", // Ancho máximo del formulario
                        width: "100%", // Asegura que el formulario no se salga del contenedor
                        padding: "20px",
                        border: "1px solid #ccc", // Borde suave
                        borderRadius: "10px", // Bordes redondeados
                        backgroundColor: "#f9f9f9", // Fondo suave
                    }}
                >
                    <input 
                        type="text" 
                        placeholder="Usuario" 
                        {...register("username")} 
                        style={{ padding: "10px", width: "90%", borderRadius: "5px", border: "1px solid #ccc" }} 
                    /><br />
                    <input 
                        type="email" 
                        placeholder="Correo" 
                        {...register("email")} 
                        style={{ padding: "10px", width: "90%", borderRadius: "5px", border: "1px solid #ccc" }} 
                    /><br />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        {...register("password")} 
                        style={{ padding: "10px", width: "90%", borderRadius: "5px", border: "1px solid #ccc" }} 
                    /><br />
                    <button 
                        type="submit" 
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#0070f3",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            width: "93%",
                        }}
                    >
                        Registrar usuario
                    </button>
                </form>
            </main>
        </>
    );
}
