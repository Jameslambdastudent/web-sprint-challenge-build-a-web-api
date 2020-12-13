const expess = require('express')
const actions = require('./actions-model')
const router = expess.Router()


router.post('/actions', (req, res) => {
    if(!req.body.project_id || !req.body.description || !req.body.notes) {
        return res.status(400).json({message: `Please Provide Require Fields`})
   }
   actions
   .insert(req.body)
   .then((action) => {
       res.status(201).json(action)
   })
   .catch((err) => {
       res.status(500).json({message: `There was an error while saving the action to the database`})
   })
})

router.get('/actions', (req,res) => {
    actions
    .get(req.params.id)
    .then((action) => {
        res.status(200).json(action)
    })
    .catch((err) => {
        res.status(500).json({message: `There was an error while saving the action to the database`})
    })
})

router.get('/actions/:id', (req, res) => {
    actions
    .get(req.params.id)
    .then((action) => {
        res.status(200).json(action)
    })
    .catch((error) => {
        res.status(500).json({message: `The project information could not be retrieved`})
    })
})

router.put('/actions/:id', (req, res) => {
    if(!req.body.project_id || !req.body.description || !req.body.notes) {
        return res.status(400).json({message: `Please provide id, description, and notes for the action`})
    }
    actions
    .update(req.params.id, req.body)
    .then((action) => {
        if(action) {
            res.status(200).json(action)
        } else {
            res.status(400).json({message: `he action with the specified ID does not exist`})
        }
    })
    .catch((error) => {
        res.status(500).json({message: `he action information could not be modified`})
    })
})

router.delete('/actions/:id', (req, res) => {
    actions
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
