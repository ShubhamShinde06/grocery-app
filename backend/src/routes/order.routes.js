import {Router} from 'express'
import verifyToken from '../middleware/verifyToken.js'
import adminAuth from '../middleware/adminAuth.js'
import {placeOrder, placeOrderStripe, ShopkeeperOrders, userOrders, updateOrdersStatuS} from '../controllers/order.controller.js'

const route = Router()

//admin
route.post('/list', adminAuth, ShopkeeperOrders)
route.post('/status', adminAuth, updateOrdersStatuS)

//payment
route.post('/place', verifyToken, placeOrder)
route.post('/stripe', verifyToken, placeOrderStripe)

//user
route.post('/userorders', verifyToken, userOrders)

//veridy payment
//route.post('/verifyStripe', adminAuth, verifyStripe)

export default route