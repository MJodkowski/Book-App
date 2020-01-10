import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions/actions";
import Flash from "./Flash";
import { Container, Row, Col, TextInput, Button } from "react-materialize";

class Register extends Component {
  state = {
    name: "",
    password: "",
    email: ""
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
                  this.props.onRegister(
                    this.state.name,
                    this.state.password,
                    this.state.email
                  );
                }}
              >
                <TextInput
                  s={12}
                  label="Username"
                  minLength={5}
                  required
                  type="text"
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
                <TextInput
                  s={12}
                  email
                  validate
                  label="Email"
                  required
                  id="email"
                  name="email"
                  onChange={this.formChangeHandler}
                  value={this.state.query}
                />
                <Button type="submit" className="submit">
                  Register
                </Button>
              </form>
              <Flash message={this.props.loginError} />
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
    error: state.auth.registerError,
    flash: state.flash.flash,
    flashType: state.flash.flashType
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRegister: (name, password, email) =>
      dispatch(actionTypes.register(name, password, email))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
