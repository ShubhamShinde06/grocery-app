import {Router} from 'express'
import { checkAuth, login, logout, register } from '../controllers/user.controller.js'
import verifyToken from '../middleware/verifyToken.js'


const route = Router()

route.post('/signup', register)
route.post('/login', login)
route.get('/view-auth', verifyToken, checkAuth)
route.post('/logout', logout)

export default route