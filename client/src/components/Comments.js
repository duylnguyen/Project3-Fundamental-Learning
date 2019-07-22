import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Comments extends Component {

    state = {
        comments: [],
        isNewCommentFormDisplayed: false,
        newComment: {
            comment: '',
        }
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

    // handleInputChange = (event) => {
    //     const copiedComment = {...this.state.newComment}
    //     copiedComment[event.target.name] = event.target.value

    //     this.setState({newComment: copiedComment})
    // }

    // handleFormSubmit = (event) => {
    //     event.preventDefault()
        
    //     axios.post(`/api/problem/${this.props.match.params.problemId}/comment`, this.state.newComment)
    //         .then((res) => {
    //             this.setState({
    //                 isNewCommentFormDisplayed: false
    //             })
    //         })
    //     this.getAllComments()
    // }

    render() {
        let commentsList = this.state.comments.map((comment) => {
            return (
                <div key={comment._id}>
                    <p>{comment.comment}</p>
                </div>
            )
        })

        return (
            // this.state.isNewCommentFormDisplayed    
            //     ? <form onSubmit={this.handleFormSubmit}>
            //         <label htmlFor="new-comment">Comment</label>
            //             <input 
            //                 type="text" 
            //                 id="new-comment" 
            //                 name="comment" 
            //                 onChange={this.handleInputChange}
            //                 value={this.state.newComment.comment}
            //                 />

            //             <input type="submit" value="Create Comment"/>
            //     </form> :
                <div>
                    {/* <button onClick={this.handleToggleCreateCommentForm}>Add Comment</button> */}
                    <div>
                        <h3>Comments</h3>
                        {commentsList}
                    </div>
                </div>
        )
    }
}
