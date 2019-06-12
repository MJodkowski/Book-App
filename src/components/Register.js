import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/actions';
import Flash from './Flash';

class Register extends Component {
    state = {
        name: '',
        password: '',
        email: '',
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
                            <form onSubmit={async e => {
                                e.preventDefault();
                                this.props.onRegister(this.state.name, this.state.password, this.state.email);
                            }}>
                                <div className="input-field">
                                    <input onChange={this.formChangeHandler}
                                        required={true}
                                        minLength={5}
                                        type='text'
                                        name='name'
                                        id='name'></input>
                                    <label htmlFor='name'>Username</label>
                                </div>
                                <div className="input-field">
                                    <input
                                        onChange={this.formChangeHandler}
                                        required={true}
                                        minLength={6}
                                        type='password'
                                        name='password'
                                        id='password'></input>
                                    <label htmlFor='password'>Password</label>
                                </div>
                                <div className="input-field">
                                    <input
                                        onChange={this.formChangeHandler}
                                        required={true}
                                        type='email'
                                        name='email'
                                        id='email'></input>
                                    <label htmlFor='email'>E-mail address</label>
                                </div>
                                <input className="btn" type='submit' value='submit'></input>
                            </form>
                            <Flash type={this.props.flashType} message={this.props.error} />
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
        error: state.auth.registerError,
        flash: state.flash.flash,
        flashType: state.flash.flashType
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onRegister: (name, password, email) => dispatch(actionTypes.register(name, password, email))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);