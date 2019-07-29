const mongoose = require('./connection.js')

const ProblemSchema = new mongoose.Schema({
  posted: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  solution: String,
  method: {
    type: String,
    default: 'None'
  },
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
