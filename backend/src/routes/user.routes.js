import {Router} from 'express'
import { adminLogin, checkAuth, login, logout, register } from '../controllers/user.controller.js'
import verifyToken from '../middleware/verifyToken.js'


const route = Router()

route.post('/signup', register)
route.post('/login', login)
route.get('/view-auth', verifyToken, checkAuth)
route.post('/logout', logout)

route.post('/admin', adminLogin)

export default route