import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Comments from './Comments'
import { Tab } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


export default class Problem extends Component {
  state = {
    problem: {},
    isEditFormDisplay: false,
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

    axios
      .put(`/api/problem/${this.state.problem._id}`, this.state.problem)
      .then(res => {
        this.setState({
          problem: res.data,
          isEditFormDisplayed: false,
          redirectToHome: true
        });
      });
  };

  handleToggleEditForm = () => {
    this.setState(state => {
      return { isEditFormDisplayed: !state.isEditFormDisplayed };
    });
  };

  handleDeleteProblem = () => {
    axios.delete(`/api/problem/${this.state.problem._id}`).then(() => {
      this.setState({ redirectToHome: true });
    });
  };

  // renderProblemContent = () => {
  //   return (
  //     <div>
  //       <h1>{this.state.problem.name}</h1>
  //       <p>{this.state.problem.method}</p>
  //       <p>{this.state.problem.description}</p>
  //       <p>{this.state.problem.solution}</p>
  //       <button onClick={this.handleToggleEditForm}>Edit Problem</button>
  //       <button onClick={this.handleDeleteProblem}>Delete Problem</button>
  //     </div>
  //   )
  // }

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/" />;
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
                    <label for="form-textarea-control-opinion">Problem Description</label>
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
                    <label for="form-textarea-control-opinion">Solution</label>
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
                    <button id="backBtn" className="ui button"><Link to="/"></Link>Back</button>
                    <input id="submitBtn" className="ui button" type="submit" value="Submit" />
                </div>

            </form>
        </div>
      
      // <form onSubmit={this.handleSubmit}>
      //   <div>
      //     <label htmlFor="problem-name">Problem</label>
      //     <input
      //       type="text"
      //       id="problem-name"
      //       name="name"
      //       onChange={this.handleInputChange}
      //       value={this.state.problem.name}
      //     />
      //   </div>

      //   <div>
      //     <label htmlFor="problem-method">Method</label>
      //     <input
      //       type="text"
      //       id="problem-method"
      //       name="method"
      //       onChange={this.handleInputChange}
      //       value={this.state.problem.method}
      //     />
      //   </div>

      //   <div>
      //     <label htmlFor="problem-description">Problem Description</label>
      //     <textarea
      //       type="text"
      //       id="problem-description"
      //       name="description"
      //       rows="10"
      //       col="10"
      //       onChange={this.handleInputChange}
      //       value={this.state.problem.description}
      //     />
      //   </div>

      //   <div>
      //     <label htmlFor="problem-solution">Solution</label>
      //     <textarea
      //       type="text"
      //       id="problem-solution"
      //       name="solution"
      //       rows="10"
      //       col="10"
      //       onChange={this.handleInputChange}
      //       value={this.state.problem.solution}
      //     />
      //   </div>

      //   <div>
      //     <input type="submit" value="Update Problem" />
      //   </div>
      // </form>
    ) : (
      <div>
        {/* <Tab name={this.state.problem.name}/> */}
        {/* <Tab
          panes={
            [
              {menuItem: 'Problem', render: () => this.renderProblemContent()},
              {menuItem: 'Comments', render: () => <Comments {...this.props}/>}
            ]
          }
        />
       */}
  

        <h1>{this.state.problem.name}</h1>
        <p>{this.state.problem.method}</p>
        <p>{this.state.problem.description}</p>
        <p>{this.state.problem.solution}</p>
        <button onClick={this.handleToggleEditForm}>Edit Problem</button>
        <button onClick={this.handleDeleteProblem}>Delete Problem</button>
        {/* <Comments {...this.props}/> */}
      </div>
    );
  }
}
