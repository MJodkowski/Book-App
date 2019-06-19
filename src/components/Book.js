import React from 'react';
import { Link } from 'react-router-dom';

const book = ({ title, author, isbn, year, reviews }) => (
    <div className="col s12 l6">
        <div className="card blue-grey darken-1">
            <div className="card-content white-text">
                <span className="card-title">{title}</span>
                <ul className="collection black-text no-border white-text">
                    <li className="collection-item teal lighten-1">{author}</li>
                    <li className="collection-item teal lighten-1">{isbn}</li>
                    <li className="collection-item teal lighten-1">{year}</li>
                </ul>
            </div>
            <div className="card-action">
                <Link to={{
                    pathname: `/book/${title}`,
                    state: {title, author, isbn, year, reviews}
                    }}>Expand</Link>
            </div>
        </div>
    </div>
)
export default book;