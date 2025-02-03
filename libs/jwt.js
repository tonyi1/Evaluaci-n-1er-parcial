import jwt from"jsonwebtoken";
import { mensaje } from "../libs/mensajes.js";;
import 'dotenv/config';
export function crearToken(dato){
    return new Promise((resolve, rejet)=>{
        jwt.sign(
            dato, 
            process.env.SECRET_TOKEN,
            {expiresIn:"1d"},
            (err,token)=>{
                if (err){
                    rejet(mensaje(400,"Error al generae el token"));
                }else{
                    resolve(token);
                }
            }
        );
        
    });
}