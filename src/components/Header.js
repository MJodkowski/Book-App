import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionTypes from '../store/actions/actions';
import { Navbar, NavItem } from 'react-materialize';

const header = (props) => {

    const loggedOutNavButtons = [
        <Link to='/login' key={'1'}>Login</Link>,
        <Link to='/register' key={'2'}>Register</Link>
    ];
    return (
        <Navbar
            brand={<Link to="/" className="brand-logo">
                <i className="material-icons">library_books</i>
                Book App
                    </Link>
            }
            alignLinks="right"
        >
            {props.loggedIn
                ? <NavItem onClick={props.logOut}>
                    Log out
                </NavItem>
                :
                loggedOutNavButtons}
        </Navbar>
    );
}
const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
};
const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(actionTypes.logOut())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(header);
