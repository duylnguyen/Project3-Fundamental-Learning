import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Comment from './Comment'

export default class Comments extends Component {

    state = {
        comments: [],
        // isNewCommentFormDisplayed: false,
        newComment: {
            comment: '',
        },
        commentToUpdate: {}
    }

    componentDidMount() {
        this.getAllComments()
    }

    getAllComments = async () => {
        const res = await axios.get(`/api/problem/${this.props.match.params.problemId}/comment`)
        console.log(res.data)
        this.setState({comments: res.data})
    }

    // handleToggleCreateCommentForm = () => {
    //     this.setState((state) => {
    //         return {isNewCommentFormDisplayed: !state.isNewCommentFormDisplayed}
    //     })
    // }

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
                    isNewCommentFormDisplayed: false
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
                    {/* <p>{comment.comment}</p>
                    <p>{comment.posted}</p> */}
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
                <h3>Comments</h3>
                <form onSubmit={this.handleFormSubmit}>
                    <label htmlFor="new-comment">Comment</label>
                    <input 
                        type="text"
                        placeholder="Type comment here ..." 
                        id="new-comment" 
                        name="comment" 
                        onChange={this.handleInputChange}
                        value={this.state.newComment.comment}
                        />
                    <input type="submit" value="Create Comment"/>
                </form> 
                <div>
                    {commentsList}
                </div>
            </div>
        )
    }
}
