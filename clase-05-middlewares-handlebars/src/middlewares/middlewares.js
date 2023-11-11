import multer from 'multer'

export function mid1(req, res, next) {
  console.log('pasé por el ' + 1)
  next()
}

export function mid2(req, res, next) {
  console.log('pasé por el ' + 2)
  next()
}

export function midOpc(req, res, next) {
  console.log('esto es opcional')
  next()
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

export const upload = multer({ storage })
