const mongoose = require("./connection.js");

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
});

const CommentCollection = mongoose.model("Comment", CommentSchema);

function getAllCommentsByProblemId(problemId) {
  return CommentCollection.find({ problemId: problemId });
}

function addComment(comment) {
  return CommentCollection.create(comment);
}

function getSingleComment(commentId) {
  return CommentCollection.findById(commentId)
}

function editComment(commentId, updatedComment) {
  return CommentCollection.findByIdAndUpdate(commentId, updatedComment)
}

module.exports = {
  getAllCommentsByProblemId,
  addComment,
  getSingleComment,
  editComment
};
