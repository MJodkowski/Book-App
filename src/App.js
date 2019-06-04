import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions/actions';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Landing from './components/Landing';

class App extends Component {
  componentDidMount() {
    this.props.authenticate();
    M.AutoInit();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <ProtectedRoute loggedIn={this.props.loggedIn} path='/dashboard' component={Dashboard} />
          <Route path="/login" component={Login} />
          {this.props.loggedIn ? <Redirect from='/' exact to='/dashboard' /> : <Route path="/" exact component={Landing} />}
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticate: () => dispatch(actionTypes.authenticate())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
