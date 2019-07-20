const express = require('express')
const commentApi = require('../models/comment.js')
const commentRouter = express.Router({mergeParams: true})

commentRouter.get('/', async (req, res) => {
  try {
    // const problem = await problemApi.getSingleProblem(req.params.problemId)
    const allComments = await commentApi.getAllCommentsByProblemId(req.params.problemId)
    res.json(allComments)
  } catch(err) {
    res.send(err)
  } 
})
// problemRouter.get('/', async (req, res) => {
//   try {
//     const allProblems = await problemApi.getAllProblems()
//     res.json(allProblems)
//   } catch(err) {
//     res.send(err)
//   }
// })

module.exports = {
  commentRouter
}
