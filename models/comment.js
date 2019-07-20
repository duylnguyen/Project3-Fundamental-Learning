const mongoose = require('./connection.js')

const CommentSchema = new mongoose.Schema({
 comment: {
  type: String,
  required: true
  },
  posted: {
    type: Date,
    required: Date.now
  },
  problemId: {
    type: mongoose.Types.ObjectId
  } 
})

const CommentCollection = mongoose.model('Comment', CommentSchema)

function getAllCommentsByProblemId(problemId) {
  return CommentCollection.find({problemId: problemId})
}

module.exports = {
  getAllCommentsByProblemId,
}
