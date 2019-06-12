import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionTypes from '../store/actions/actions';
import Flash from './Flash';

class Login extends Component {
    state = {
        name: '',
        password: ''
    }
    formChangeHandler = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }
    render() {
        if (this.props.loggedIn) {
            return <Redirect to='./dashboard' />;
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col s6 offset-s3">
                            <form onSubmit={e => {
                                e.preventDefault();
                                this.props.onLogin(this.state.name,
                                    this.state.password);
                            }}>
                                <div className="input-field">
                                    <input 
                                        onChange={this.formChangeHandler}
                                        required={true}
                                        type='text'
                                        name='name'
                                        id='name'></input>
                                    <label htmlFor='name'>Username</label>
                                </div>
                                <div className="input-field">
                                    <input
                                        onChange={this.formChangeHandler}
                                        required={true}
                                        type='password'
                                        name='password'
                                        id='password'></input>
                                    <label htmlFor='password'>Password</label>
                                </div>
                                <input className="btn" type='submit' value='submit'></input>
                            </form>
                            <Flash message={this.props.loginError} />
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        loginError: state.auth.loginError
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onLogin: (name, password) => dispatch(actionTypes.logIn(name, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);