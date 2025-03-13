import crypto from "crypto";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { mensaje } from "../libs/mensajes.js";

//  Función para encriptar contraseñas
export function encriptarPassword(password) {
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto.scryptSync(password, salt, 10,64,"sha512").toString("hex");
    return { salt, hash };
}

//  Función para validar contraseña
export function validarPassword(password, salt, hash) {
    const hashEvaluar = crypto.scryptSync(password, salt, 10,64,"sha512").toString("hex");
    return hashEvaluar === hash;
}

//  Middleware para verificar usuario autenticado
export function usuarioAutorizado(token, req){
    //const token = req.cookies.token;
    if(!token){
        return mensaje(400,"Usuario no autorizado");
        //res.status(400).json("Usuario no autorizado");
    }
    jwt.sign(token,process.env.SECRET_TOKEN,(error,usuario)=>{;
    if(error){
        return mensaje(400,"Usuario no autorizado");
        //res.status(400).json("usuario no autorizado");
    }
    req.usuario=usuario; //es el id del usuario para recuperar los datos, amigos ,mensajes etc
    });
    return mensaje(200,"Usuario autorizado");
}



export function adminAutorizado(){
    const respuesta = usuarioAutorizado(req.cookies.token, req);
    if(respuesta.status!=200){
        return mensaje(400,"Admin no autorizado");
    }
    if(!isAdmin(respuesta.usuario.id)){
        return mensaje(400,"Admin no autorizado");
    }
    return mensaje(200,"Admin autorizado");
}



