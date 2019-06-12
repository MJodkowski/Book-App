import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/actions';
import sort from '../utils/sort';
import Book from './Book';
import Author from './Author';
import Flash from './Flash';

class dashBoard extends Component {
    state = {
        wasSearched: false,
        query: '',
        field: 'title'
    }
    formChangeHandler = (e, attribute) => {
        if (e.target.type === 'radio') {
            this.props.erase();
            this.setState({
                [e.target[attribute]]: e.target.value,
                query: '',
                wasSearched: false
            });
        } else {
            this.setState({ [e.target[attribute]]: e.target.value });
        }
    }
    searchHandler = e => {
        if (!this.state.query) return;
        e.preventDefault();
        if (!this.state.wasSearched) {
            this.setState({ wasSearched: true });
        }
        this.props.search(this.state.field, this.state.query);
    }
    generateCards = () => {
        if (!this.props.searchResults.length && this.state.wasSearched) {
            return <p>No results</p>
        }
        this.props.searchResults.sort(sort(this.state.field));
        if (this.state.field === 'author') {
            const authorList = this.props.searchResults.reduce((authors, book) => {
                if (!authors.includes(book.author)) {
                    authors.push(book.author);
                }
                return authors;
            }, [])
            return authorList.map(author => <Author key={author} author={author} books={null} />);
        } else {
            return this.props.searchResults.map(book =>
                <Book key={book.isbn}
                    title={book.title}
                    author={book.author}
                    isbn={book.isbn}
                    year={book.year} />
            )
        }
    }
    render() {
        return (
            <div className="container">
                <Flash type={this.props.flashType} message="Registration successful" />
                <form>
                    <div className="input-field">
                        <i className="material-icons prefix">search</i>
                        <input
                            type={this.state.field === 'isbn' ? 'number' : 'text'}
                            required
                            id="query"
                            onChange={e => this.formChangeHandler(e, 'id')}
                            value={this.state.query} />
                        <label htmlFor="query">Search</label>
                    </div>
                    <p>
                        <label>
                            <input
                                type="radio"
                                checked={this.state.field === 'title'}
                                onChange={e =>
                                    this.formChangeHandler(e, 'name')}
                                name="field"
                                id="title"
                                value="title" />
                            <span>Title</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input
                                type="radio"
                                checked={this.state.field === 'author'}
                                onChange={e =>
                                    this.formChangeHandler(e, 'name')}
                                name="field"
                                id="author"
                                value="author" />
                            <span>Author</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input
                                type="radio"
                                checked={this.state.field === 'isbn'}
                                onChange={e => this.formChangeHandler(e, 'name')}
                                name="field"
                                id="isbn"
                                value="isbn" />
                            <span>ISBN</span>
                        </label>
                    </p>
                    <input
                        className="btn"
                        type="submit"
                        value="Search"
                        onClick={e => this.searchHandler(e)} />
                </form>
                <div className="container">
                    <div className="row">
                        {this.generateCards()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchResults: state.search.searchResults,
        flash: state.flash.flash,
        flashType: state.flash.flashType
    }
}
const mapDispatchToProps = dispatch => {
    return {
        search: (field, query) => dispatch(actionTypes.search(field, query)),
        erase: () => dispatch(actionTypes.eraseSearch([]))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(dashBoard);
