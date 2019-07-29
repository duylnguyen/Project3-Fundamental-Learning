import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom"
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/solarized_dark';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/mode/javascript/javascript.js');

export default class Problem extends Component {
  state = {
    problem: {},
    isEditFormDisplay: false,
    isSolutionDisplayed: false,
    redirectToHome: false,
    newSolution: ''
  };

  componentDidMount() {
    this.getSingleProblem();
  }

  getSingleProblem = async () => {
    axios.get(`/api/problem/${this.props.match.params.problemId}`)
      .then(res => {
        this.setState({ problem: res.data })
      })
  }

  handleInputChange = event => {
    const copiedProblem = { ...this.state.problem };
    copiedProblem[event.target.name] = event.target.value;

    this.setState({ problem: copiedProblem });
  };

  onChange = (newValue)  => {
    const {
      problem
    } = this.state;
    problem.solution = newValue;
    this.setState({problem})
    console.log(newValue)
  }

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
    let options = {
      lineNumbers: true,
      theme: "material",
      mode: "javascript",
    }

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

            <AceEditor
              mode="javascript"
              theme="solarized_dark"
              onChange={this.onChange}
              value={this.state.problem.solution}
              name="my-editor"
              id="my-editor"
              editorProps={{$blockScrolling: true}}
            />
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
        <pre>{this.state.problem.description}</pre>

        {this.state.isSolutionDisplayed ? (
        <div>
          <h4>Solution:</h4>
          <div>
            <CodeMirror
                value={this.state.problem.solution}
                options={options}
            />
          </div>

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
