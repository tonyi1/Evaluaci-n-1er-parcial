"use client";
import { borrarUsuario } from "@/api/peticiones";

export default function BorrarUsuario({ id }) {
    const manejarBorrado = async () => {
        await borrarUsuario(id);
        alert("Usuario eliminado");
    };

    return (
        <>
            <h1>Borrar Usuario</h1>
            <button onClick={manejarBorrado}>Eliminar</button>
        </>
    );
}
