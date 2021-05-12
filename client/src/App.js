import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Beneficiarye from './pages/BeneficiaryPage';
import Navbar from './components/Navbar';
import './CSS/index.css';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/beneficiary" component={Beneficiarye} />
      </Switch>
    </Router>
  );
}

export default App;
