import {Router} from 'express'
import { productAdd, productDelete, productGet, productPut, productSingleGet } from '../controllers/product.controller.js'
import upload from '../middleware/multer.middleware.js'
import verifyToken from '../middleware/verifyToken.js'

const route = Router()

route.post('/add-product',verifyToken, upload.fields([{name: 'image1', maxCount:1}, {name: 'image2', maxCount:1}, {name: 'image3', maxCount:1}, {name: 'image4', maxCount:1}]), productAdd)
route.get('/get-product', productGet)
route.get('/get-single-product/:id', productSingleGet)
route.put('/put-product/:id', verifyToken, upload.fields([{name: 'image1', maxCount:1}, {name: 'image2', maxCount:1}, {name: 'image3', maxCount:1}, {name: 'image4', maxCount:1}]), productPut)
route.delete('/delete-product', verifyToken, productDelete)

export default route