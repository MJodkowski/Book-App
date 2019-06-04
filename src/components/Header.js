import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionTypes from '../store/actions/actions';
const header = (props) => {
    return (
        <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo">
                    <i className="material-icons">library_books</i>
                    Book App
                </Link>
                <ul className="right">
                    <li>
                        {props.loggedIn
                            ? <button className="btn" onClick={props.logOut}>Log out</button>
                            : <Link to='/login'>Login</Link>}
                    </li>
                </ul>
            </div>
        </nav>
    );
}
const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn
    }
};
const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(actionTypes.logOut())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(header);
