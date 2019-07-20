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
                <p>{this.state.problem.name}</p>
                <p>{this.state.problem.method}</p>
                <p>{this.state.problem.description}</p>
                <p>{this.state .problem.solution}</p>
            </div>
        )
    }
}
