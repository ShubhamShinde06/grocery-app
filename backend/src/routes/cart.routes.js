import {Router} from 'express'
import verifyToken from '../middleware/verifyToken.js'
import { addToCart, deleteFromCart, getUserCart, updateToCart } from '../controllers/cart.controller.js'

const route = Router()

route.post('/add', verifyToken, addToCart)
route.post('/update', verifyToken, updateToCart)
route.post('/get', verifyToken, getUserCart)
route.post('/delete', verifyToken, deleteFromCart)

export default route