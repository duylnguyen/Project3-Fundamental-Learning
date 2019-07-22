// import React, { Component } from 'react'
// import axios from 'axios'
// import { Redirect } from 'react-router-dom'

// export default class Comment extends Component {

//     state = {
//         comment: {},
//     }

//     componentDidMount() {
//         axios.get(`/api/problem/${this.props.match.params.problemId}/comment/${this.commentId}`)
//             .then((res) => {
//                 this.setState({comment: res.data})
//             })
//     }

//     render() {
//         return (
//             <div>
//                 <p>{this.state.comment.comment}</p>
//             </div>
//         )
//     }
// }
