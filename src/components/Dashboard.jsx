import React, { Component } from "react";
import { connect } from "react-redux";
import { search, eraseSearch } from "../store/actions";
import sort from "../utils/sort";
import Book from "./Book";
import Author from "./Author";
import Flash from "./Flash";
import { Container, TextInput, RadioGroup, Button } from "react-materialize";

class dashBoard extends Component {
  state = {
    query: "",
    field: "title"
  };
  formChangeHandler = (e, attribute) => {
    if (e.target.type === "radio") {
      this.props.erase();
      this.setState({
        [e.target[attribute]]: e.target.value,
        query: ""
      });
    } else {
      this.setState({ [e.target[attribute]]: e.target.value });
    }
  };
  searchHandler = e => {
    if (!this.state.query) return;
    e.preventDefault();
    this.props.search(this.state.field, this.state.query);
  };
  generateCards = () => {
    if (!this.props.searchResults) {
      return <p>No results</p>;
    } else if (this.props.isFetching) {
      return <p>Loading...</p>;
    }
    this.props.searchResults.sort(sort(this.state.field));
    if (this.state.field === "author") {
      const authorList = this.props.searchResults.reduce((authors, book) => {
        if (!authors.includes(book.author)) {
          authors.push(book.author);
        }
        return authors;
      }, []);
      return authorList.map(author => {
        const books = this.props.searchResults.reduce((books, book) => {
          if (book.author === author) {
            books.push(book);
          }
          return books;
        }, []);
        return <Author key={author} author={author} books={books} />;
      });
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
            type={this.state.field === "isbn" ? "number" : "text"}
            required
            id="query"
            onChange={e => this.formChangeHandler(e, "id")}
            value={this.state.query}
          />
          <RadioGroup
            name="field"
            label="Search by"
            value="title"
            radioClassNames="radio-button"
            options={[
              { label: "Title", value: "title" },
              { label: "Author", value: "author" },
              { label: "ISBN", value: "isbn" }
            ]}
            onChange={e => this.formChangeHandler(e, "name")}
          />
          <Button type="submit" className="submit">
            Search
          </Button>
        </form>
        <Container>
          <div className="row">{this.generateCards()}</div>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchResults: state.search.searchResults,
    flash: state.flash.flash,
    flashType: state.flash.flashType,
    isFetching: state.spinner.isFetching
  };
};
const mapDispatchToProps = dispatch => {
  return {
    search: (field, query) => dispatch(search(field, query)),
    erase: () => dispatch(eraseSearch([]))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(dashBoard);
