import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import { Link } from 'react-router-dom'
import axios from "axios";
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/solarized_dark';

export default class NewProblemForm extends Component {
  state = {
    newProblem: {
      name: "",
      method: "",
      description: "",
      solution: "",
      codePenHash: ""
    },
    redirectToHome: false
  };

  handleInputChange = event => {
    const copiedProblem = { ...this.state.newProblem };
    copiedProblem[event.target.name] = event.target.value;

    this.setState({ newProblem: copiedProblem });
  };

  onChange = (newValue)  => {
    const {
      newProblem
    } = this.state;
    newProblem.solution = newValue;
    this.setState({newProblem})
    console.log(newValue)
  }

  handleFormSubmit = event => {
    event.preventDefault();

    axios.post(`/api/problem/`, this.state.newProblem)
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
                    <label htmlFor="form-textarea-control-opinion">Problem Description</label>
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
                    <label htmlFor="form-textarea-control-opinion">Solution</label>

                    <AceEditor
                    mode="javascript"
                    theme="solarized_dark"
                    onChange={this.onChange}
                    value={this.state.newProblem.solution}
                    name="my-editor"
                    id="my-editor"
                    editorProps={{$blockScrolling: true}}
                    />
                </div>

                <div className="newProblemBtn">
                    <button id="backBtn" className="ui button"><Link to="/"></Link>Back</button>
                    <input id="submitBtn" className="ui button" type="submit" value="Submit" />
                </div>

            </form>
        </div>
    );
  }
}