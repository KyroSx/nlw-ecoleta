import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const storageConfig = multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', 'uploads'),
  filename: (request, file, callback) => {
    const hash = crypto.randomBytes(6).toString('hex')

    const fileName = `${hash}-${file.originalname}`

    callback(null, fileName)
  }
})

export default multer({
  storage: storageConfig,
  fileFilter: (req, file, callback) => {
    const imageExtentionRegex = /\.(jpg|jpeg|png)$/

    const fileUploaded = file.originalname

    if (!fileUploaded.match(imageExtentionRegex)) {
      const error = new Error('Only image files are allowed!')
      return callback(error)
    }
    callback(null, true)
  }
})
