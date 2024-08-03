const logger = require('./utils/logger')
const app = require("./app")

const PORT = 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})