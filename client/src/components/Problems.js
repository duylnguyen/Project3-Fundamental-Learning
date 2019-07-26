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
                <table className="ui striped table">
                    <tbody className="">
                        <tr className="top aligned">
                            <Link className="hover" to={`/problems/${problem._id}`}> 
                                <div>
                                    <td className="click">
                                        <p className="problemName">{problem.name}</p>
                                        <p>{problem.description}</p>
                                    </td>
                                </div> 
                            </Link>
                        </tr>  
                    </tbody>
                </table>  
            )
        })

        return (
            <div className="listProblems">
                <h1>Coding Challenges</h1>
                <div>   
                    {problemsList}
                </div>
            </div>
        )
    }
}
                