"use client";
import { useState } from "react";
import { obtenerUsuarioPorId } from "@/api/peticiones";

export default function BuscarUsuario() {
    const [id, setId] = useState("");
    const [usuario, setUsuario] = useState(null);

    const buscarUsuario = async () => {
        const respuesta = await obtenerUsuarioPorId(id);
        setUsuario(respuesta.data);
    };

    return (
        <>
            <h1>Buscar Usuario</h1>
            <input type="text" placeholder="ID Usuario" onChange={(e) => setId(e.target.value)} />
            <button onClick={buscarUsuario}>Buscar</button>
            {usuario && <p>{usuario.nombre}</p>}
        </>
    );
}
