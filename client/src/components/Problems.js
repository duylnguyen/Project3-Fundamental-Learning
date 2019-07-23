import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Table } from 'semantic-ui-react'

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
                    <table class="ui striped table">
                        <tbody class="">
                            <tr class="top aligned">
                                <td class="">
                                    <p><Link to={`/problems/${problem._id}`}>{problem.name}</Link></p>
                                    <p>{problem.description}</p>
                                </td> 
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        })

        return (
            <div className="listProblems">
                <h1>Collection Of Problems</h1>
                {problemsList}
            </div>
        )
    }
}
