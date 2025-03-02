import {Router} from 'express'
import verifyToken from '../middleware/verifyToken.js'
import adminAuth from '../middleware/adminAuth.js'
import {placeOrder, placeOrderStripe, ShopkeeperOrders, userOrders, updateOrdersStatuS, verifyStripe} from '../controllers/order.controller.js'

const route = Router()

//admin
route.post('/list', verifyToken, ShopkeeperOrders)
route.post('/status', verifyToken, updateOrdersStatuS)

//payment
route.post('/place', verifyToken, placeOrder)
route.post('/stripe', verifyToken, placeOrderStripe)

//shopkeeper
route.get('/shoporders/:shopId', verifyToken, ShopkeeperOrders)


//user
route.get('/userorders/:userId', verifyToken, userOrders)

//verify payment
route.post('/verifyStripe', verifyToken, verifyStripe)

export default route