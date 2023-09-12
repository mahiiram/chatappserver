import UserModel from "../model/Usermodel.js";
import bcrypt from 'bcrypt';


export async function register (req,res,next){
    const {username,email,password} = req.body;
    let existingUsername;
    try {
        existingUsername = await UserModel.findOne({ username:username });
    } catch (err) {
        return console.log(err)
    }
    if (existingUsername) {
        return res.status(500).send({
            msg: "user already exist"
        })
    }
    let existingEmail;
    try {
        existingEmail = await UserModel.findOne({ email:email });
    } catch (err) {
        return console.log(err)
    }
    if (existingEmail) {
        return res.status(500).send({
            msg: "user already exist"
        })
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    let newUser;
    try {
        newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });
        newUser = await newUser.save()
    } catch (err) { return console.log(err) }
    if (!newUser) {
        return res.status(500).send({ msg: "unexpected error occured" })

    }
    return res.status(201).send({
        newUser,
        msg:'User Succefully Register'
    })

} 