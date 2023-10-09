import { Router } from "express";
import { createChat,userChats, findChat} from "../Controller/Chatcontroller.js";

const chatrouter = Router()


chatrouter.route('/').post(createChat)
chatrouter.route('/:userId').get(userChats)
chatrouter.route('/find/:firstId/:secondId').get(findChat)
export default chatrouter;