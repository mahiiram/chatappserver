import multer from 'multer';
import { Router } from "express";
import UserModel from '../model/Usermodel.js';
import path from 'path';
export const Avatarrouter = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/images')
    },
    filename: (req, file, cb) => {
        // generate a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(file.originalname);
        cb(null, uniqueSuffix + fileExtension);
      },
})

const upload = multer({
    storage: storage
})

Avatarrouter.put('/:id', upload.single('file'), async (req, res, next) => {
    console.log(req.file)
    var { id } = req.params;
    // var idArray = id.split(':');
    // Remove the 0th index (first element)
    // idArray.shift();

    // // Join the remaining elements without spaces and commas
    // var id = idArray.join('');

    console.log(id);
    let user;
    try {
        user = await UserModel.findByIdAndUpdate(id, {
            AvatarImage: req.file.filename
        })
    } catch (err) {
        return console.log(err)
    }
    if (!user) {
        res.status(500).json({
            status:false,
            msg: "Something Went Wrong"
        })
    }
    return res.status(201).json({
        status:true,
        msg: "Updated Successfully"
    })
})