import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "./store/actions/actions";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Landing from "./components/Landing";
import BookPage from "./components/BookPage";

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
          <ProtectedRoute
            loggedIn={this.props.loggedIn}
            path="/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute
            loggedIn={this.props.loggedIn}
            path="/book"
            component={BookPage}
          />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {this.props.loggedIn ? (
            <Redirect from="/" exact to="/dashboard" />
          ) : (
            <Route path="/" exact component={Landing} />
          )}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: () => dispatch(actionTypes.authenticate())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
