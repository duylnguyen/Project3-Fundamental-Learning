import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Problems from './components/Problems.js'
import Problem from './components/Problem'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Problems}/>
          <Route path="/problems/:problemId" component={Problem} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
