"use client";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { login } from "@/api/peticiones";
import { useAuth } from "@/hooks/useAuth";

export default function Login(){
    const router = useRouter();
    const [mensaje, setMensaje] = useState("");
    const { register, handleSubmit, reset, setFocus } = useForm();

    return (
        <div style={styles.container}>
            {/* Botón fijo para ir al inicio */}
            <button 
                style={styles.buttonFixed}
                onClick={() => router.push("/")}>
                Ir al Inicio
            </button>

            <main style={styles.main}>
                <div style={styles.loginBox}>
                    <h1 style={styles.header}>Login</h1>
                    <form onSubmit={handleSubmit(async (usuario) => {
                        const respuesta = await login(usuario);
                        
                        if (respuesta.tipoUsuario === "usuario") {
                            router.push("/User");
                        } else if (respuesta.tipoUsuario === "admin") {
                            router.push("/admin");
                        } else {
                            setMensaje("Datos incorrectos");
                            toast.error("Usuario o contraseña incorrectos.");
                            reset(); 
                            setTimeout(() => setFocus("username"), 100);
                        }
                    })}>
                        <input 
                            type="text" 
                            placeholder="Usuario" 
                            {...register("username")} 
                            style={styles.input}
                        /><br/><br/>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            {...register("password")} 
                            style={styles.input}
                        /><br/><br/>
                        <button 
                            type="submit" 
                            style={styles.submitButton}>
                            Ingresar
                        </button>
                    </form>
                    {mensaje && <p style={styles.errorMessage}>{mensaje}</p>}

                    {/* Parte de registrarse */}
                    <p style={styles.registerText}>¿No tienes cuenta?</p>
                    <button 
                        style={styles.registerButton}
                        onClick={() => router.push("/registro")}>
                        Registrarse
                    </button>
                </div>
            </main>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
    },
    buttonFixed: {
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
    },
    main: {
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh", 
        padding: "20px"
    },
    loginBox: {
        maxWidth: "400px", 
        width: "100%", 
        textAlign: "center", 
        padding: "20px", 
        border: "1px solid #ccc", 
        borderRadius: "10px", 
        backgroundColor: "#f9f9f9"
    },
    header: {
        marginBottom: "20px",
    },
    input: {
        padding: "10px", 
        width: "90%", 
        marginBottom: "10px", 
        borderRadius: "5px", 
        border: "1px solid #ccc"
    },
    submitButton: {
        padding: "10px 20px",
        backgroundColor: "#0070f3",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        width: "90%",
    },
    errorMessage: {
        color: "red", 
        marginTop: "10px"
    },
    registerText: {
        marginTop: "20px"
    },
    registerButton: {
        marginTop: "10px", 
        padding: "10px 15px", 
        fontSize: "14px", 
        backgroundColor: "#28a745", 
        color: "white", 
        border: "none", 
        borderRadius: "5px", 
        cursor: "pointer", 
        width: "90%"
    }
};
