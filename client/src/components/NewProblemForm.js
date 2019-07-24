import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import { Link } from 'react-router-dom'
import axios from "axios";

export default class NewProblemForm extends Component {
  state = {
    newProblem: {
      name: "",
      method: "",
      description: "",
      solution: ""
    },
    redirectToHome: false
  };

  handleInputChange = event => {
    const copiedProblem = { ...this.state.newProblem };
    copiedProblem[event.target.name] = event.target.value;

    this.setState({ newProblem: copiedProblem });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    axios.post(`/api/problem`, this.state.newProblem)
        .then(res => {
            this.setState({ newProblem: res.data, redirectToHome: true});
    });
  };

  render() {

    if (this.state.redirectToHome === true) {
        return <Redirect to="/" />
    }

    return (
        <div className="formSubmit">
            <form className="ui form" onSubmit={this.handleFormSubmit}>
                <div className="field">
                    <label htmlFor="new-problem-name">Problem</label>
                    <div className="ui input">
                        <input 
                            type="text" 
                            placeholder="Problem Name..." 
                            id="new-problem-name"
                            name="name"
                            onChange={this.handleInputChange}
                            value={this.state.newProblem.name}
                        />
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="new-method">Method Used</label>
                    <div className="ui input">
                        <input 
                            type="text" 
                            placeholder=".methodName()" 
                            id="new-method"
                            name="method"
                            onChange={this.handleInputChange}
                            value={this.state.newProblem.method}
                        />
                    </div>
                </div>

                <div className="field">
                    <label for="form-textarea-control-opinion">Problem Description</label>
                    <textarea 
                        id="form-textarea-control-opinion" 
                        placeholder="Description..." 
                        rows="6"
                        name="description"
                        onChange={this.handleInputChange}
                        value={this.state.newProblem.description}
                    >
                    </textarea>  
                </div>

                <div className="field">
                    <label for="form-textarea-control-opinion">Solution</label>
                    <textarea 
                        id="form-textarea-control-opinion" 
                        placeholder="Solution..." 
                        rows="6"
                        name="solution"
                        onChange={this.handleInputChange}
                        value={this.state.newProblem.solution}
                    >
                    </textarea>  
                </div>
                <div>
                    <button id="backBtn" className="ui button"><Link to="/"></Link>Back</button>
                    <input id="submitBtn" className="ui button" type="submit" value="Submit" />
                </div>

            </form>
        </div>
    );
  }
}


{/* <form onSubmit={this.handleFormSubmit}>
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
    />
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
    />
    </div>

    <div>
    <input type="submit" value="Add Problem" />
    </div>
</form> */}