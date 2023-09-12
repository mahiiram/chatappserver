import { Router } from "express";

const router = Router()
import * as controller from './Controller/Usercontroller.js'

router.route('/register').post(controller.register)
router.route('/login').post()


export default router;