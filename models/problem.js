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

function updateProblem(problemId, updatedProblem) {
  return ProblemCollection.findByIdAndUpdate(problemId, updatedProblem)
}

function deleteProblem(problemId) {
  return ProblemCollection.findByIdAndDelete(problemId)
}

module.exports = {
  getAllProblems,
  createNewProblem,
  getSingleProblem,
  updateProblem,
  deleteProblem
}
