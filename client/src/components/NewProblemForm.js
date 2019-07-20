import React, { Component } from 'react'
import axios from 'axios'

export default class NewProblemForm extends Component {
    state = {
        problems: [],
        newProblem: {
            name: "",
            method: "",
            description: "",
            solution: ""
        }
    }

    componentDidMount() {
        this.getAllProblems()
    }

    getAllProblems = async () => {
        const res = await axios.get('/api/problem')
        this.setState({ problems: res.data })       
    }

    handleInputChange = (event) => {
        const copiedProblem = {...this.state.newProblem}
        copiedProblem[event.target.name] = event.target.value

        this.setState({newProblem: copiedProblem})
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        
        axios.post(`/api/problem`, this.state.newProblem)
            .then((res) => {
                this.setState({newProblem: {}})
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <div>
                    <label htmlFor="new-problem-name">Problem</label>
                        <input 
                            type="text" 
                            id="new-problem-name" 
                            name="name" 
                            onChange={this.handleInputChange}
                            value={this.state.newProblem.name}
                            />
                    </div>

                    <div>
                    <label htmlFor="new-method">Method</label>
                        <input 
                            type="text" 
                            id="new-method" 
                            name="method" 
                            onChange={this.handleInputChange}
                            value={this.state.newProblem.method}
                            />
                    </div>

                    <div>
                    <label htmlFor="new-problem-description">Problem Description</label>
                        <textarea 
                            type="text" 
                            id="new-problem-description"
                            name="description"
                            rows="10"
                            col="10"
                            onChange={this.handleInputChange}
                            value={this.state.newProblem.description}
                        >
                        </textarea>
                    </div>

                    <div>
                    <label htmlFor="new-problem-solution">Solution</label>
                        <textarea 
                            type="text" 
                            id="new-problem-solution"
                            name="solution"
                            rows="10"
                            col="10"
                            onChange={this.handleInputChange}
                            value={this.state.newProblem.solution}
                        >
                        </textarea>
                    </div>

                    <div>
                        <input type="submit" value="Create Problem"/>
                    </div>
                </form>
            </div>
        )
    }
}
