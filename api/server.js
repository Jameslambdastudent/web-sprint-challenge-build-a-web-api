const express = require('express');
const server = express();

const actionRouter = require('./api/actions/actions-router')
const projectsRouter = require('./api/projects/projects-router')

server.use(express.json())
server.use(actionRouter)
server.use(projectsRouter)

module.exports = server;
