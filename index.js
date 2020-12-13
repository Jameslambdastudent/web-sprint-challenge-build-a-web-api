const express = require('express')
const server = express()
const PORT = 4000

const actionRouter = require('./api/actions/actions-router')
const projectsRouter = require('./api/projects/projects-router')

server.use(express.json())
server.use(actionRouter)
server.use(projectsRouter)



server.listen(PORT, () => console.log(`Server Running Strong On ${PORT}`))