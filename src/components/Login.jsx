import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logIn } from "../store/actions";
import Flash from "./Flash";
import { Container, Row, Col, TextInput, Button } from "react-materialize";

class Login extends Component {
  state = {
    name: "",
    password: ""
  };
  formChangeHandler = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    if (this.props.loggedIn) {
      return <Redirect to="./dashboard" />;
    } else {
      return (
        <Container>
          <Row>
            <Col s={6} offset={"s3"}>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  this.props.onLogin(this.state.name, this.state.password);
                }}
              >
                <TextInput
                  s={12}
                  label="Username"
                  required
                  id="name"
                  name="name"
                  onChange={this.formChangeHandler}
                  value={this.state.query}
                />
                <TextInput
                  s={12}
                  label="Password"
                  required
                  id="password"
                  name="password"
                  onChange={this.formChangeHandler}
                  value={this.state.query}
                />
                <Button type="submit" className="submit">
                  Login
                </Button>
              </form>
              <Flash />
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    loginError: state.errors.loginError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogin: (name, password) => dispatch(logIn(name, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
