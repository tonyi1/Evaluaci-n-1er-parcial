import { json, Router } from "express";
import {login, register, obtenerUsuarios, buscarUsuarioPorId, borrarUsuarioPorId,editarUsuarioPorId} from "../db/usuariosDB.js";
const router = Router();

router.post("/registro", async(req, res)=>{

    const respuesta = await register(req.body);
    //console.log ("bien");
    console.log(respuesta.mensajeOriginal)
    res.cookie("token",respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
});



router.post("/acceso", async(req,res)=>{
    const respuesta=await login(req.body);
    console.log(respuesta.mensajeOriginal)
    res.cookie("token",respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.get("/salir", async(req, res)=>{
    res.json("Estas en acceso")
});

router.get("/usuariosLogeados",async(req,res)=>{
    res.json("Usuarios combencionales y administradores logueados");
});

router.get("/administradores",async(req,res)=>{
    res.json("Solo administradores logeados");
});

router.get("/cualquierusuario",async(req,res)=>{
res.json("Todos los usuarios sin loguearse");
});

// Obtener todos los usuarios
router.get("/usuarios", async (req, res) => {
    const respuesta = await obtenerUsuarios();
    res.status(respuesta.status).json(respuesta);
});

// Buscar usuario por ID
router.get("/usuario/:id", async (req, res) => {
    const idLimpio = req.params.id.trim(); // Eliminar espacios y caracteres no visibles
    const respuesta = await buscarUsuarioPorId(idLimpio);
    res.status(respuesta.status).json(respuesta);
});



// Borrar usuario por ID
router.delete("/usuario/:id", async (req, res) => {
    const respuesta = await borrarUsuarioPorId(req.params.id);
    res.status(respuesta.status).json(respuesta);
});

// Actualizar  usuario por ID
router.put("/usuario/:id", async (req, res) => {
    const respuesta = await editarUsuarioPorId(req.params.id, req.body);
    res.status(respuesta.status).json(respuesta);
});

export default router;