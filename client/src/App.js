import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Problems from './components/Problems.js'
import Problem from './components/Problem'
import Navbar from './components/Navbar'
import NewProblemForm from './components/NewProblemForm'
import './App.css';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Problems}/>
          <Route path="/problems/:problemId" component={Problem} />
          <Route path="/" component={NewProblemForm} />
          <Route path="/problems/:problemsId/comment" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
