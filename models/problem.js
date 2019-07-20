const mongoose = require('./connection.js')

const ProblemSchema = new mongoose.Schema({
 name: String,
 description: String,
 solution: String,
 method: String
})

const ProblemCollection = mongoose.model('Problem', ProblemSchema)

function getAllProblems() {
  return ProblemCollection.find()
}

function createNewProblem(problemObject) {
  return ProblemCollection.create(problemObject)
}

function getSingleProblem(problemId) {
  return ProblemCollection.findById(problemId)
}

module.exports = {
  getAllProblems,
  createNewProblem,
  getSingleProblem
}
