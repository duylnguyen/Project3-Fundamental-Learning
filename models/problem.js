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

module.exports = {
  getAllProblems
}
