import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class Comment extends Component {

    state = {
        comment: {},
        isEditCommentFormDisplayed: false,
    }

    // componentDidMount() {
    //     this.getComment()
    // }

    // getComment = () => {
    //     axios.get(`/api/problem/${this.props.match.params.problemId}/comment/${this.props.commentId}`)
    //         .then((res) => {
    //             this.setState({comment: res.data})
    //         })
    // }

    // getComment = async () => {
    //     const res = await axios.get(`/api/problem/${this.props.match.params.problemId}/comment/${this.props.commentId}`)
    //     this.setState({comment: res.data})
    // }

    // handleInputChange = (event) => {
    //     const copiedComment = {...this.state.comment}
    //     copiedComment[event.target.name] = event.target.value
        
    //     this.setState({comment: copiedComment})
    // }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.handleUpdateSubmit()
        this.setState({
            isEditCommentFormDisplayed: false
        })
    }

    handleToggleEditCommentForm = () => {
        this.setState((state) => {
            return {isEditCommentFormDisplayed: !state.isEditCommentFormDisplayed}
        })
    }

    handleDeleteComment = () => {
        axios.delete(`/api/problem/${this.props.match.params.problemId}/comment/${this.props.commentId}`)
        .then(() => {
            this.props.getAllComments()
        })
    }

    render() {
        return (
            <div>
                <p>{this.props.comment}</p>
                <p>{this.props.posted}</p>
            {this.state.isEditCommentFormDisplayed
            ? <form onSubmit={this.handleSubmit}>
            <label htmlFor="edit-comment"></label>
                <input 
                    type="text"
                    id={this.props.commentId} 
                    name="comment" 
                    onChange={this.props.handleUpdateInputChange}
                    value={this.props.comment}
                    />
                <input type="submit" value="Submit"/>
            </form> 
            : <div>
                <button onClick={this.handleToggleEditCommentForm}>Edit Comment</button>
                <button onClick={this.handleDeleteComment}>Delete Comment</button>
            </div>}
            </div>
        )
    }
}
