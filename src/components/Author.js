import React from 'react';

const author = ({ author, books }) => (
    <div className="col s12 l6">
        <div className="card blue-grey darken-1">
            <div className="card-content white-text">
                <span className="card-title">{author}</span>
                <ul className="collection black-text no-border">
                    <li className="collection-item teal">{author}</li>
                    {/* <li className="collection-item">{isbn}</li>
                    <li className="collection-item">{year}</li> */}
                </ul>
                {books}
            </div>
            <div className="card-action">
            </div>
        </div>
    </div>
)
export default author;