import UserModel from "../model/Usermodel.js";
import bcrypt from 'bcrypt';



export async function getUser(req, res) {
    var { id } = req.params;
    // var idArray = id.split(':');
    // // Remove the 0th index (first element)
    // idArray.shift();

    // // Join the remaining elements without spaces and commas
    // var id = idArray.join('');

    // console.log(id);

    try {
        // Find the user by ID
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function register(req, res, next) {
    const { username, email, password } = req.body;
    console.log(req.body)
    let existingUsername;
    try {
        existingUsername = await UserModel.findOne({ username: username });
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
        existingEmail = await UserModel.findOne({ email: email });
    } catch (err) {
        return console.log(err)
    }
    if (existingEmail) {
        return res.status(500).send({
            msg: "user already exist"
        })
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    let user;
    try {
        user = new UserModel({
            username,
            email,
            password: hashedPassword,
        });
        user = await user.save()
    } catch (err) { return console.log(err) }
    if (!user) {
        return res.status(500).send({ msg: "unexpected error occured" })
    }
    delete user.password;
    return res.status(201).send({
        user,
        status: true,
        msg: 'Registered successfully'
    })
}

export async function login(req, res, next) {
    const { username, password } = req.body;
    let user;
    try {
        user = await UserModel.findOne({ username: username })

    } catch (error) {
        return console.log(error)
    }
    if (!user) {
        return res.status(404).send({
            status: false,
            msg: 'Username not found'
        })
    }

    const ispasswordcorrect = bcrypt.compare(password, user.password);
    if (!ispasswordcorrect) {
        return res.status(400).json({
            status: false,
            msg: "Incorrect password"
        })
    }
    delete user.password;
    return res.status(201).json({
        status: true,
        user,
        msg: "Login Successfully",
    })
}  
export async function  getAllUser (req,res){
    const currentUserId = req.params.id
    let alluser;
    try{
       alluser = await UserModel.find({ _id: { $ne: currentUserId } })
    }catch(err){
        return console.log(err)
    }
    if(!alluser){
        return res.status(500).json({message:'Unexpected error occured'})
    }
    return res.status(200).json({
       alluser
    })
}