import { Router } from "express";

const router = Router()
import * as controller from './Controller/Usercontroller.js';

router.route('/register').post(controller.register)
router.route('/login').post(controller.login)
router.route('/getuser/:id').get(controller.getUser)


router.route('/getalluser/:id').get(controller.getAllUser)


//chat routes


export default router;