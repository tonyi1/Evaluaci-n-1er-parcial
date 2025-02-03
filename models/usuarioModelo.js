import mongoose from "mongoose";

const userShema =new mongoose.Schema({
    username:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    salt:{
        type:String,
        require:true
    }
},

{
    timestamps:true
}
);


export default mongoose.model('User', userShema);

