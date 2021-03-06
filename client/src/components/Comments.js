import React, { Component } from 'react'
import axios from 'axios'
import Comment from './Comment'


export default class Comments extends Component {

    state = {
        comments: [],
        newComment: {
            comment: '',
        },
        commentToUpdate: {}
    }

    componentDidMount() {
        this.getAllComments()
    }

    getAllComments = async () => {
        axios.get(`/api/problem/${this.props.match.params.problemId}/comment`)
            .then(res => {
                this.setState({comments: res.data})
            })
    }

    handleInputChange = (event) => {
        const copiedComment = {...this.state.newComment}
        copiedComment[event.target.name] = event.target.value

        this.setState({newComment: copiedComment})
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        
        axios.post(`/api/problem/${this.props.match.params.problemId}/comment`, this.state.newComment)
            .then((res) => {
                this.setState({
                    isNewCommentFormDisplayed: false,
                    newComment: {comment: ''}
                })
            })
        this.getAllComments()
    }

    handleUpdateInputChange = (event) => {
        const copiedComment = {...this.state.commentToUpdate}
        copiedComment[event.target.name] = event.target.value
        copiedComment._id = event.target.id
        
        this.setState({commentToUpdate: copiedComment})
    }

    handleUpdateSubmit = (event) => {
        const copiedComment = {...this.state.commentToUpdate}
        copiedComment.posted = new Date()
        axios.put(`/api/problem/${this.props.match.params.problemId}/comment/${this.state.commentToUpdate._id}`, copiedComment)
            .then(() => {
                this.getAllComments()
            })
    }

    render() {
        let commentsList = this.state.comments.map((comment) => {
        let isCurrentlyEditing = comment._id === this.state.commentToUpdate._id
            return (
                <div key={comment._id}>
                    <Comment
                        {...this.props}
                        comment={isCurrentlyEditing ? this.state.commentToUpdate.comment : comment.comment}
                        posted={comment.posted}
                        commentId={comment._id}
                        handleUpdateInputChange={this.handleUpdateInputChange}
                        handleUpdateSubmit={this.handleUpdateSubmit}
                        getAllComments={this.getAllComments}
                    />
                </div>
            )
        })

        return (   
            <div>
                
                <form className="ui reply form" onSubmit={this.handleFormSubmit}>
                    <label htmlFor="new-comment"></label>
                    <div className="field">
                        <textarea 
                            rows="3"
                            type="text"
                            placeholder="Type comment here ..." 
                            id="new-comment" 
                            name="comment" 
                            onChange={this.handleInputChange}
                            value={this.state.newComment.comment}
                        >
                        </textarea> 
                    </div>
                        <div className="addCommentBtn">
                        <button className="ui secondary button" type="submit">
                            <i aria-hidden="true" className="edit icon"></i>
                            Add Comment
                        </button>
                        </div>
                </form> 
            
                <div>
                    {commentsList}
                </div>
            </div>
        )
    }
}
