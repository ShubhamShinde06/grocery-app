import {Router} from 'express'
import { ownShopkeeperSubCategory, subCategoryAdd, subCategoryDelete, subCategoryGet, subCategoryPut, subCategorySingleGet } from '../controllers/subCategory.controller.js'
import verifyToken from '../middleware/verifyToken.js'
import upload from '../middleware/multer.middleware.js'

const route = Router()

route.post('/add-subcategory',verifyToken, upload.single('image'),subCategoryAdd)
route.get('/get-subcategory', subCategoryGet)
route.get('/get-single-subcategory/:id', subCategorySingleGet)
route.get('/get-owner-subcategory/:id', verifyToken, ownShopkeeperSubCategory)
route.put('/put-subcategory/:id', verifyToken, upload.single('image'),subCategoryPut)
route.delete('/delete-subcategory/:id', verifyToken, subCategoryDelete)

export default route