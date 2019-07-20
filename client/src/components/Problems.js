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
        const res = axios.get('/api/problem')
        this.setState({ problems: res.data })       
    }

    render() {
        let problemsList = this.state.problems.map((problem) => {
            return (
                <div>
                    <Link key={problem._id} to={`/problems/${problem._id}`}>{problem.name}</Link>
                </div>
            )
        })

        return (
            <div>
                {problemsList}
            </div>
        )
    }
}
