import React, { Component } from 'react'
import axios from 'axios'

export default class Problem extends Component {
    state = {
        problem: {}
    }

    componentDidMount() {
        this.getSingleProblem()
    }

    getSingleProblem = async () => {
        const res = await axios.get(`/api/problem/${this.props.match.params.problemId}`)
        this.setState({ problem: res.data})
    }

    render() {
        return (
            <div>
                <h1>{this.state.problem.name}</h1>
            </div>
        )
    }
}
