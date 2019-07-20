import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Problems extends Component {
    state = {
        problems: []
    }

    componentDidMount() {
        this.getAllProblems()
    }

    getAllProblems = async () => {
        const res = await axios.get('/api/problem')
        this.setState({ problems: res.data })       
    }

    

    render() {
        let problemsList = this.state.problems.map((problem) => {
            return (
                <div key={problem._id}>
                    <Link to={`/problems/${problem._id}`}>{problem.name}</Link>
                    <p>{problem.description}</p>
                </div>
            )
        })

        return (
            <div>
                <h1>Collection Of Problems</h1>
                {problemsList}
            </div>
        )
    }
}
