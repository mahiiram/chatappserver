import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:10,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAvatatImageSet:{
        type:Boolean,
        default:false
    },
    AvatarImage:{
        type:String,
        default:""
    }
})

const UserModel = mongoose.model('user',userSchema);
export default UserModel;