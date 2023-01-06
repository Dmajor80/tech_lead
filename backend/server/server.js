const app = require('./src/app')
const dbConnect = require('./src/config/db.config')
const { getServerPort } = require('./src/config/env')
const { errorMiddleWareModule } = require('./src/middleware')
const { authRoute } = require('./src/routes/auth.route')
const { productRoute } = require('./src/routes/product.route')

const PORT = getServerPort() || 3000
app.use('/api/v1/order_items', productRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/account', authRoute)

app.use('*', errorMiddleWareModule.notFound)
app.use(errorMiddleWareModule.errorHandler)
app.listen(PORT, async () => {
  try {
    await dbConnect.mongodbConnect()
    console.log(`server is running on port ${PORT}`)
  } catch (error) {
    console.log(error)
  }
})
