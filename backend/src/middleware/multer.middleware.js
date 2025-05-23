import multer from 'multer'

const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname) // Unique file name
  }
})

const upload = multer({ storage })

export default upload
