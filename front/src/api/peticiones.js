import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export const peticionRegistro = async (usuario) => {
    console.log("usuario");
    console.log(usuario);
    
   return await axios.post(`${API}/registro`, usuario, { withCredentials: true });
};


export const login = async(usuario)=>{
    try {
        const rutaLogin = `${API}/acceso`
        const respuesta =  await axios.post(rutaLogin,usuario,{withCredentials: true});
        //console.log(respuesta);
        
        if (!respuesta.data) return {estado:false}
        return {estado:true,tipoUsuario:respuesta.data}        
    } catch (error) {
        //console.log(error);
        return {estado:false}
    }
}

export const cerrarSesion = async () => {
    return await axios.post(`${API}/salir`, {}, { withCredentials: true });
};


export const obtenerUsuarioPorId = async (id) => {
    return await axios.get(`${API}/usuario/${id}`, { withCredentials: true });
    return respuesta.data;
};

export const obtenerTodosLosUsuarios = async () => {
    const respuesta = await axios.get(`${API}/usuarios`, { withCredentials: true });
    return respuesta.data;  // 🔹 Extrae solo la lista de usuarios
};


export const editarUsuario = async (id, datosActualizados) => {
    console.log(id);
    return await axios.put(`${API}/usuario/${id}`, datosActualizados, { withCredentials: true });
};

export const borrarUsuario = async (id) => {
    return await axios.delete(`${API}/usuario/${id}`, { withCredentials: true });
};
