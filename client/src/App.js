import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './helper/authRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import Header from './components/Header';
import Budget from './pages/Budget';
import AddBudgetForm from './components/AddBudgetForm';

const App = () => {
  return (
    <Router>
      <div className="app">
        <AddBudgetForm />
        <Header />
        <div className="container">
          <Switch>
            <PublicRoute exact path="/login" component={Login} />
            <PublicRoute exact path="/register" component={Register} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/budget/:id" component={Budget} />
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
