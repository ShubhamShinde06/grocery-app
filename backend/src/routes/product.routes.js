import {Router} from 'express'
import {addProduct, listProducts, ownShopkeeperProducts, removeProduct, singleProduct, updateProduct} from '../controllers/product.controller.js'
import upload from '../middleware/multer.middleware.js'
import verifyToken from '../middleware/verifyToken.js'

const router = Router()

router.post('/add', upload.fields([{name: 'image1', maxCount:1}, {name: 'image2', maxCount:1}, {name: 'image3', maxCount:1}, {name: 'image4', maxCount:1}]), addProduct)
router.get('/list', listProducts)
router.delete('/delete/:id', removeProduct)
router.put('/update/:id', updateProduct)
router.get('/single-product/:id', singleProduct)
router.get('/my-product/:id', verifyToken ,  ownShopkeeperProducts)

export default router