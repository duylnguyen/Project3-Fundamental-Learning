import React, { Component } from 'react'
import axios from 'axios'

export default class Comment extends Component {
    state = {
        comment: {},
        isEditCommentFormDisplayed: false,
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.handleUpdateSubmit()
        this.setState({
            isEditCommentFormDisplayed: false,
            comment: ''
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
                <div className="ui comments">
                    <div className="comment">
                        <div className="content">
                            <a href="#" className="author">Anomynous</a>
                            <div className="metadata"><span>{this.props.posted}</span></div>
                            <pre className="commentText">{this.props.comment}</pre>
                            
                                {this.state.isEditCommentFormDisplayed
                                ? <form className="ui reply form" onSubmit={this.handleSubmit}>
                                <label htmlFor="edit-comment"></label>
                                <div class="field">
                                    <textarea 
                                        rows="2"
                                        type="text"
                                        placeholder="Type comment here ..." 
                                        id={this.props.commentId} 
                                        name="comment" 
                                        onChange={this.props.handleUpdateInputChange}
                                        value={this.props.comment}
                                    >
                                    </textarea> 
                                </div>
                                    <div className="addCommentBtn">
                                    <button class="ui secondary button" type="submit">
                                        <i aria-hidden="true" class="edit icon"></i>
                                        Edit
                                    </button>
                                    </div>
                                </form> 
                                : <div className="commentBtn">
                                    <button 
                                        className="ui compact button" 
                                        onClick={this.handleToggleEditCommentForm}
                                    >
                                        Edit Comment
                                    </button>
                                    <button 
                                        className="ui compact button" 
                                        onClick={this.handleDeleteComment}
                                    >
                                        Delete Comment
                                    </button>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>  
        )
    }
}