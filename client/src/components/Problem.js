import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom"

export default class Problem extends Component {
  state = {
    problem: {},
    isEditFormDisplay: false,
    isSolutionDisplayed: false,
    redirectToHome: false
  };

  componentDidMount() {
    this.getSingleProblem();
  }

  getSingleProblem = async () => {
    const res = await axios.get(
      `/api/problem/${this.props.match.params.problemId}`
    );
    this.setState({ problem: res.data });
  };

  handleInputChange = event => {
    const copiedProblem = { ...this.state.problem };
    copiedProblem[event.target.name] = event.target.value;

    this.setState({ problem: copiedProblem });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios.put(`/api/problem/${this.state.problem._id}`, this.state.problem)
      .then(res => {
        this.setState({
          problem: res.data,
          isEditFormDisplayed: false
        })
      })
      .then(() => {
        this.getSingleProblem();
      })
  };

  handleToggleEditForm = () => {
    this.setState(state => {
      return { isEditFormDisplayed: !state.isEditFormDisplayed };
    });
  };

  handleToggleSolution = () => {
    this.setState(state => {
      return { isSolutionDisplayed: !state.isSolutionDisplayed };
    });
  };

  handleDeleteProblem = () => {
    axios.delete(`/api/problem/${this.state.problem._id}`)
    .then(() => {
      this.setState({ redirectToHome: true });
    });
  };

  render() {
    if(this.state.redirectToHome === true) {
      return <Redirect to="/" /> 
    }
    return this.state.isEditFormDisplayed ? (
      <div className="formSubmit">
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
              <label htmlFor="problem-name">Problem</label>
              <div className="ui input">
                  <input 
                    type="text" 
                    id="problem-name"
                    name="name"
                    onChange={this.handleInputChange}
                    value={this.state.problem.name}
                  />
              </div>
          </div>

          <div className="field">
            <label htmlFor="method">Method Used</label>
            <div className="ui input">
                <input 
                    type="text" 
                    id="method"
                    name="method"
                    onChange={this.handleInputChange}
                    value={this.state.problem.method}
                />
            </div>
          </div>

          <div className="field">
            <label htmlFor="form-textarea-control-opinion">Problem Description</label>
            <textarea 
                id="form-textarea-control-opinion"                        
                rows="6"
                name="description"
                onChange={this.handleInputChange}
                value={this.state.problem.description}
            >
            </textarea>  
          </div>

          <div className="field">
            <label htmlFor="form-textarea-control-opinion">Solution</label>
            <textarea 
                id="form-textarea-control-opinion"                       
                rows="6"
                name="solution"
                onChange={this.handleInputChange}
                value={this.state.problem.solution}
            >
            </textarea> 
          </div>
            <div>
              <button id="backBtn" className="ui button" onClick={this.handleToggleEditForm}>Back</button>
              <input id="submitBtn" className="ui button" type="submit" value="Submit" />
            </div>
        </form>
      </div>
      ) : (
      <div>
        <h1>{this.state.problem.name}</h1>
        <p>Posted on: {this.state.problem.posted}</p>
        <p>Method Used: {this.state.problem.method}</p>
        <p>{this.state.problem.description}</p>

        {this.state.isSolutionDisplayed ? (
        <div>
        <h4>Solution:</h4>
        <pre className="solutionBox">{this.state.problem.solution}</pre>
        <button id="toggleHideBtn" className="ui secondary button" onClick={this.handleToggleSolution}>Hide</button>
        </div>
        ) : (
        <div>
          <button 
            id="toggleShowBtn" 
            className="ui secondary button" 
            onClick={this.handleToggleSolution}
          >
            Solution
          </button>
          <span className="note">
            Note: Only use when you are really struggle
          </span>
        </div>
        )}
        <div className="deleteAndEditProblemBtn">
          <button className="ui button" onClick={this.handleToggleEditForm}>Edit Problem</button>
          <button className="ui button" onClick={this.handleDeleteProblem}>Delete Problem</button>
        </div>
      </div>
      );
    }
  }
