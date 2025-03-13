import { Router } from "express";
import {
    login,
    register,
    obtenerUsuarios,
    buscarUsuarioPorId,
    borrarUsuarioPorId,
    editarUsuarioPorId
} from "../db/usuariosDB.js";
import { usuarioAutorizado } from "../middelwares/funcionesPassword.js";

const router = Router();

//  Registro de usuario
router.post("/registro", async (req, res) => {
    const respuesta = await register(req.body);
    res.cookie("token",respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
});

//  Inicio de sesión
router.post("/acceso", async (req, res) => {
    console.log(req.body);
    
    const respuesta = await login(req.body);

    res.cookie("token",respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
});

//  Cerrar sesión
router.get("/salir", (req, res) => {
    res.cookie("token", "", { expires: new Date(0) }).status(200).json("Sesión cerrada correctamente");
});

//  Usuarios logueados
router.get("/usuariosLogeados", async(req,res)=>{
    const respuesta=usuarioAutorizado(req.cookies.token,req);
    res.status(respuesta.status).json(respuesta.mensajeUsuario);
    //res.json("Usuarios convncionales y administradores logueados");
});

//  Administradores (falta implementar `adminAutorizado`)
router.get("/administradores",async(req,res)=>{
    const respuesta = adminAutorizado(req);
    res.status(respuesta.status).json(respuesta.mensajeUsuario);
});

//  Cualquier usuario
router.get("/cualquierusuario", async (req, res) => {
    res.json("Todos los usuarios sin loguearse");
});

//  Obtener todos los usuarios
router.get("/usuarios", async (req, res) => {
    const respuesta = await obtenerUsuarios();
    console.log(respuesta.mensajeOriginal)
    res.status(respuesta.status).json(respuesta.token);
});

//  Buscar usuario por ID
router.get("/usuario/:id", async (req, res) => {
    const idLimpio = req.params.id.trim(); // Elimina espacios y caracteres invisibles

    // Validar formato del ID antes de consultar en MongoDB
    if (!idLimpio.match(/^[a-fA-F0-9]{24}$/)) {
        return res.status(400).json({ mensaje: "ID de usuario no válido" });
    }

    const respuesta = await buscarUsuarioPorId(idLimpio);
    res.status(respuesta.status).json(respuesta.mensajeOriginal);
});

//  Borrar usuario por ID
router.delete("/usuario/:id", async (req, res) => {
    const idLimpio = req.params.id.trim();

    if (!idLimpio.match(/^[a-fA-F0-9]{24}$/)) {
        return res.status(400).json({ mensaje: "ID de usuario no válido" });
    }

    const respuesta = await borrarUsuarioPorId(idLimpio);
    res.status(respuesta.status).json(respuesta);
});

//  Actualizar usuario por ID
router.put("/usuario/:id", async (req, res) => {
    const idLimpio = req.params.id.trim();

    if (!idLimpio.match(/^[a-fA-F0-9]{24}$/)) {
        return res.status(400).json({ mensaje: "ID de usuario no válido" });
    }

    const respuesta = await editarUsuarioPorId(idLimpio, req.body);
    res.status(respuesta.status).json(respuesta);
});

export default router;
