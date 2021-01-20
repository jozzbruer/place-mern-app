import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import './App.css';
import NewPlace from './places/pages/NewPlace';
import Users from './users/pages/Users';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;
