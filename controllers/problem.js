const express = require('express')
const problemApi = require('../models/problem.js')
const problemRouter = express.Router()

// problemRouter.get('/', async (req, res) => {
//   try {
//     const allProblems = await problemApi.getAllProblems()
//     res.json(allProblems)
//   } catch(err) {
//     res.send(err)
//   }
// })

problemRouter.get('/', (req, res) => {
  problemApi.getAllProblems()
    .then((problems) => {
      res.json(problems)
    })
    .catch((err) => {
      res.send(err)
    })
})

module.exports = {
  problemRouter
}
