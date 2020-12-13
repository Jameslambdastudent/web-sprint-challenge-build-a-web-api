const express = require('express')
const projects = require('./projects-model')
const router = express.Router()

router.post('/projects', (req, res) => {
    if(!req.body.name || !req.body.description) {
        return res.status(400).json({message: `Please Provide Require Fields`})
   }
   projects
   .insert(req.body)
   .then((project) => {
       res.status(201).json(project)
   })
   .catch((err) => {
       res.status(500).json({message: `There was an error while saving the action to the database`})
   })
})

router.get('/projects', (req,res) => {
    projects
    .get(req.params.id)
    .then((project) => {
        res.status(200).json(project)
    })
    .catch((err) => {
        res.status(500).json({message: `There was an error while saving the action to the database`})
    })
})

router.get('/projects/:id', (req, res) => {
    projects
    .get(req.params.id)
    .then((project) => {
        res.status(200).json(project)
    })
    .catch((error) => {
        res.status(500).json({message: `The project information could not be retrieved`})
    })
})

router.put('/projects/:id', (req, res) => {
    if(!req.body.name|| !req.body.description) {
        return res.status(400).json({message: `Please provide Name, Description`})
    }
    projects
    .update(req.params.id, req.body)
    .then((project) => {
        if(project) {
            res.status(200).json(project)
        } else {
            res.status(400).json({message: `The Project with the specified ID does not exist`})
        }
    })
    .catch((error) => {
        res.status(500).json({message: `he action information could not be modified`})
    })
})

router.delete('/projects/:id', (req, res) => {
    projects
    .remove(req.params.id)
    .then((count) => {
        if(count > 0) {
            res.status(200).json({message: `Action Was Removed`})
        } else {
            res.status(400).json({message: `The action with the specified ID does not exist`})
        }
    })
    .catch((error) => {
        res.status(500).json({message: `The action could not be removed`})
    })
})

module.exports = router
