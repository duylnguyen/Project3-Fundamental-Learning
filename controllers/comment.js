const express = require("express");
const commentApi = require("../models/comment.js");
const problemApi = require("../models/problem.js");
const commentRouter = express.Router({ mergeParams: true });

// commentRouter.get('/', async (req, res) => {
//   try {
//     // const problem = await problemApi.getSingleProblem(req.params.problemId)
//     const allComments = await commentApi.getAllCommentsByProblemId(req.params.problemId)
//     res.json(allComments)
//   } catch(err) {
//     res.send(err)
//   }
// })

commentRouter.get('/', (req, res) => {
  problemApi.getSingleProblem(req.params.problemId)
      .then(problem => {
        commentApi.getAllCommentsByProblemId(problem._id)
          .then(comments => {
            res.json(comments);
          });
      })
      .catch(err => {
      res.send(err);
      });
});

commentRouter.post('/', (req, res) => {
  req.body.problemId = req.params.problemId
    commentApi.addComment(req.body)
      .then((comment) => {
        res.json(comment)
      })
      .catch((err) => {
        res.send(err)
      })
})

commentRouter.get('/:commentId', (req, res) => {
  problemApi.getSingleProblem(req.params.problemId)
    .then((problem) => {
      commentApi.getSingleComment(req.params.commentId)
        .then((comment) => {
          res.json(comment)
        })
    })
    .catch((err) => {
      res.send(err)
    })
})

commentRouter.put('/:commentId', (req,res) => {
  req.body.problemId = req.params.problemId
    commentApi.editComment(req.params.commentId, req.body)
      .then((updatedComment) => {
        res.json(updatedComment)
      })
      .catch((err) => {
        res.send(err)
      })
})

commentRouter.delete('/:commentId', (req, res) => {
  req.body.problemId = req.params.problemId
    commentApi.deleteComment(req.params.commentId)
      .then((comment) => {
        res.json('Comment Deleted')
      })
      .catch((err) => {
        res.send(err)
      })
})

module.exports = {
  commentRouter
};
