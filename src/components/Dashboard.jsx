import React, { Component } from 'react';
import { connect } from 'react-redux';
import { search, eraseSearch, changePage } from '../store/actions';
import Book from './Book';
import Author from './Author';
import Flash from './Flash';
import {
  Container,
  TextInput,
  RadioGroup,
  Button,
  Pagination,
  Icon,
  Row,
} from 'react-materialize';

class dashBoard extends Component {
  state = {
    query: '',
    field: 'title',
  };
  formChangeHandler = (e, attribute) => {
    if (e.target.type === 'radio') {
      this.props.erase();
      this.setState({
        [e.target[attribute]]: e.target.value,
        query: '',
      });
    } else {
      this.setState({ [e.target[attribute]]: e.target.value });
    }
  };
  searchHandler = e => {
    if (!this.state.query) return;
    e.preventDefault();
    this.props.changePage(1);
    this.props.search(
      this.state.field,
      this.state.query,
      1,
      this.props.perPage
    );
  };
  generateCards = () => {
    if (!this.props.searchResults) {
      return <p>No results</p>;
    } else if (this.props.isFetching) {
      return <p>Loading...</p>;
    }
    if (this.state.field === 'author') {
      return this.props.searchResults.map(author => {
        return <Author key={author.name} author={author.name} books={author.books}/>;
      })
    } else {
      return this.props.searchResults.map(book => (
        <Book
          id={book._id}
          key={book.isbn}
          title={book.title}
          author={book.author}
          isbn={book.isbn}
          year={book.year}
          reviews={book.reviews}
        />
      ));
    }
  };
  render() {
    return (
      <Container>
        <Flash />
        <form onSubmit={e => this.searchHandler(e)}>
          <TextInput
            icon="search"
            label="Search"
            type={this.state.field === 'isbn' ? 'number' : 'text'}
            required
            id="query"
            onChange={e => this.formChangeHandler(e, 'id')}
            value={this.state.query}
          />
          <RadioGroup
            name="field"
            label="Search by"
            value="title"
            radioClassNames="radio-button"
            options={[
              { label: 'Title', value: 'title' },
              { label: 'Author', value: 'author' },
              { label: 'ISBN', value: 'isbn' },
            ]}
            onChange={e => this.formChangeHandler(e, 'name')}
          />
          <Button type="submit" className="submit">
            Search
          </Button>
        </form>
        <Container>
          <Row>{this.generateCards()}</Row>
        </Container>
        {this.props.paginationPages >= 2 && (
          <Pagination
            onSelect={page => {
              this.props.changePage(page);
              this.props.search(
                this.state.field,
                this.state.query,
                page,
                this.props.perPage
              );
            }}
            activePage={this.props.currentPage}
            items={this.props.paginationPages}
            leftBtn={<Icon>chevron_left</Icon>}
            maxButtons={10}
            rightBtn={<Icon>chevron_right</Icon>}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchResults: state.search.searchResults,
    flash: state.flash.flash,
    flashType: state.flash.flashType,
    isFetching: state.spinner.isFetching,
    paginationPages: state.pagination.numberOfPages,
    perPage: state.pagination.perPage,
    currentPage: state.pagination.currentPage,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    search: (field, query, currentPage, perPage) =>
      dispatch(search(field, query, currentPage, perPage)),
    erase: () => dispatch(eraseSearch([])),
    changePage: page => dispatch(changePage(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(dashBoard);
