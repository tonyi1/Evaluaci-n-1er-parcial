import mongoose from "mongoose";
import { mensaje } from "../libs/mensajes.js";

export async function  conectarDB() {
    try{
        const conexion = await mongoose.connect("mongodb://localhost:27017/MongoDBapp");
        //const conexion = await mongoose.connect("mongodb+srv://antoniojesushdz2004:DNurR0iVFDTxwHoi@mongodbapp.z9qn2.mongodb.net/?retryWrites=true&w=majority&appName=MongoDBApp");

        //console.log(conexion);
        //console.log("Conexion correcta mondongo")
        return mensaje(200,"conexion OK","")
    } catch(error){
        return mensaje(400,"Error al conectarse a la DB",error);
    }
}

