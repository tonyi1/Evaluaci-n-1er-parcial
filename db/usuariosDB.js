import User from "../models/usuarioModelo.js";
import { encriptarPassword, validarPassword} from "../middelwares/funcionesPassword.js";
import { mensaje } from "../libs/mensajes.js";
import { crearToken } from "../libs/jwt.js";

export const register = async ({username, email, password})=>{
    try{
        const usuarioDuplicado = await User.findOne({username});
        const emailDuplicado = await User.findOne({email});
        if (usuarioDuplicado || emailDuplicado){
            return mensaje(400,"El usuario ya existe");

        }
        const{salt,hash}=encriptarPassword(password);
        const dataUser = new User({username,email,password:hash,salt});
        const resouestaMongo = await dataUser.save();
        //console.log("usuario guardado correcto")
        const token= await crearToken({id:resouestaMongo._id});
        return mensaje(200,"Usuario registrado","",token);
    }catch(error){
        //console.log("Error")
        return mensaje(400,"Error usuario no registrado",error);
    }
}

export const login=async({username,password})=>{
    try {
        const usuarioEncontrado = await User.findOne({username});
        if(!usuarioEncontrado){
            return mensaje (400, "Datos incorrectos")
        }
        const passwordValido=validarPassword(password, usuarioEncontrado.salt,usuarioEncontrado.password);
        if (!passwordValido){
            return mensaje(400,"Datos incorrectos");
        }   
        const token = await crearToken({ id: usuarioEncontrado._id });
        return mensaje(200,  `Bienvenido ${usuarioEncontrado.username}`,"",token);
        } catch (error) {
        return mensaje(400, "Datos incorrectos")
    }
};

// Mostrar todos los usuarios
export const obtenerUsuarios = async () => {
    try {
        const usuarios = await User.find();
        return mensaje(200, "Lista de usuarios",  usuarios);
    } catch (error) {
        return mensaje(400, "Error al obtener usuarios", error);
    }
};

// Buscar usuario por ID
export const buscarUsuarioPorId = async (id) => {
    try {
        const usuario = await User.findById(id);
        if (!usuario) return mensaje(404, "Usuario no encontrado");
        return mensaje(200, "Usuario encontrado", usuario);
    } catch (error) {
        return mensaje(400, "Error al buscar usuario", error);
    }
};

// Borrar usuario por ID
export const borrarUsuarioPorId = async (id) => {
    try {
        const usuario = await User.findByIdAndDelete(id);
        if (!usuario) return mensaje(404, "Usuario no encontrado");
        return mensaje(200, "Usuario borrado correctamente");
    } catch (error) {
        return mensaje(400, "Error al borrar usuario", error);
    }
};

// Actualizar  usuario por ID
export const editarUsuarioPorId = async (id, datosActualizados) => {
    try {
        const usuario = await User.findByIdAndUpdate(id, datosActualizados, { new: true });
        if (!usuario) return mensaje(404, "Usuario no encontrado");
        return mensaje(200, "Usuario actualizado correctamente", usuario);
    } catch (error) {
        return mensaje(400, "Error al actualizar usuario", error);
    }
};
