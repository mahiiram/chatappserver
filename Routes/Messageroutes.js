import { Router } from "express";
import { addMessage, getMessages } from "../Controller/Messagecontroller.js";


const messageroutes = Router();

messageroutes.route('/').post(addMessage);
messageroutes.route('/:chatId').get(getMessages);



export default messageroutes;