import User from "../models/usuarioModelo.js";
import { encriptarPassword, validarPassword } from "../middelwares/funcionesPassword.js";
import { mensaje } from "../libs/mensajes.js";
import { crearToken } from "../libs/jwt.js";

export const register = async ({ username, email, password }) => {
    try {
        const usuarioDuplicado = await User.findOne({ username });
        const emailDuplicado = await User.findOne({ email });

        if (usuarioDuplicado || emailDuplicado) {
            return mensaje(400, "El usuario ya existe");
        }

        const { salt, hash } = await encriptarPassword(password);
        const dataUser = new User({ username, email, password:hash, salt });
        const respuestaMongo = await dataUser.save();

        const token = await crearToken({ id:respuestaMongo._id });
        return mensaje(200, "Usuario registrado", respuestaMongo, token);
    } catch (error) {
        return mensaje(400, "Error usuario no registrado", error.message);
    }
};

export const login = async ({ username, password }) => {
    try {
        const usuarioEncontrado = await User.findOne({ username });
        if (!usuarioEncontrado) {
            return mensaje(400, "1Datos incorrectos");
        }

        const passwordValido = await validarPassword(password, usuarioEncontrado.salt, usuarioEncontrado.password);
        if (!passwordValido) {
            return mensaje(400, "2Datos incorrectos");
        }

        const token = await crearToken({ id: usuarioEncontrado._id });
        return mensaje(200,  usuarioEncontrado.tipoUsuario, usuarioEncontrado, token);
    } catch (error) {
        return mensaje(400, "Error en el login", error.message);
    }
};

// Mostrar todos los usuarios
export const obtenerUsuarios = async()=>{
    try {
        const usuariosEncontrados = await User.find();
        if(usuariosEncontrados.length === 0){
            return mensaje(400,"Error al mostrar usuarios");
        }
        const usuariosFormateados = usuariosEncontrados.map(usuario => ({
            id: usuario.id,
            nombre: usuario.username,
            correo: usuario.email,
            tipo: usuario.tipoUsuario,
        }));
        return mensaje(200,"Usuarios: ","",usuariosFormateados);
    } catch (error) {
        return mensaje(400,"Error al encontrar los usuarios",error);
    }
}

// Buscar usuario por ID
export const buscarUsuarioPorId = async (id) => {
    try {
        const usuario = await User.findById(id);
        if (!usuario) return mensaje(404, "Usuario no encontrado");
        return mensaje(200, "Usuario encontrado", usuario);
    } catch (error) {
        return mensaje(400, "Error al buscar usuario", error.message);
    }
};

// Borrar usuario por ID
export const borrarUsuarioPorId = async (id) => {
    try {
        const usuario = await User.findByIdAndDelete(id);
        if (!usuario) return mensaje(404, "Usuario no encontrado");
        return mensaje(200, "Usuario borrado correctamente");
    } catch (error) {
        return mensaje(400, "Error al borrar usuario", error.message);
    }
};

// Actualizar usuario por ID
export const editarUsuarioPorId = async (id, datosActualizados) => {
    try {
        const usuario = await User.findByIdAndUpdate(id, datosActualizados, { new: true });
        if (!usuario) return mensaje(404, "Usuario no encontrado");
        return mensaje(200, "Usuario actualizado correctamente", usuario);
    } catch (error) {
        return mensaje(400, "Error al actualizar usuario", error.message);
    }
};
