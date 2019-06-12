import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionTypes from '../store/actions/actions';

import Aux from '../hoc/Aux';

const header = (props) => {
    return (
        <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo">
                    <i className="material-icons">library_books</i>
                    Book App
                </Link>
                <ul className="right">
                    {props.loggedIn
                        ? <li>
                            <button className="btn" onClick={props.logOut}>Log out</button>
                        </li>
                        : <Aux>
                            <li><Link to='/login'>Login</Link></li>
                            <li><Link to='/register'>Register</Link></li>
                        </Aux>}
                </ul>
            </div>
        </nav>
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
