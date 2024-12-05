const jsonServer = require('json-server')
const multer  = require('multer')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public/images')
    },
    filename: function (req, file, cb) {
      let date = new Data()
      let imageFilename = date.getTime() + "_" + file.originalname
      req.body.imageFilename = imageFilename
      cb(null, imageFilename)
    }
  })
  
  const bodyParser = multer({ storage: storage }).any()

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(bodyParser)
server.post("/products", (req, res, next) => {
    let date = new Data()
    req.body.createdAt = date.toISOString()

    if (req.body.price){
        req.body.price = Number(rew.body.price)
    }

//errors handel................


    let hasErrors = false
    let errors = {}

    if(req.body.name.lenght < 2){
        hasErrors = true
        errors.name = "The name lenght should be atleast 2 characters."
    }
    if(req.body.brand.lenght < 2){
        hasErrors = true
        errors.brand = "The brand lenght should be atleast 2 characters."
    }
    if(req.body.category.lenght < 2){
        hasErrors = true
        errors.category = "The category lenght should be atleast 2 characters."
    }
    if(req.body.price.lenght <=0){
        hasErrors = true
        errors.price = "The price must be in positive number."
    }
    if(req.body.description.lenght < 20){
        hasErrors = true
        errors.description = "The description lenght should be atleast 20 characters."
    }

    //for bad request.................

    if(hasErrors) {
        req.status(400).jsonp(errors)
    return
}


  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})