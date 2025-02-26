import {Router} from 'express'
import { categoryAdd, categoryDelete, categoryGet, categoryPut, categorySingleGet, ownShopkeeperCategore } from '../controllers/category.controller.js'
import verifyToken from '../middleware/verifyToken.js'
import upload from '../middleware/multer.middleware.js'

const route = Router()

route.post('/add-category', verifyToken, upload.single('image'), categoryAdd);
route.get('/get-category', categoryGet);
route.get('/get-single-category/:categoryId', categorySingleGet);
route.get('/get-owner-category/:id', verifyToken, ownShopkeeperCategore)
route.put('/put-category/:id',verifyToken, upload.single('image') ,categoryPut)
route.delete('/delete-category/:id', verifyToken, categoryDelete)


export default route 