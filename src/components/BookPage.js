import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/actions'
import { Container, Row, Col, Textarea, Select, Button } from 'react-materialize';

class BookPage extends Component {
    state = {
        addReview: true,
        editReview: false,
        reviewId: null,
        rating: '',
        content: '',
        alreadyPosted: this.props.reviews.filter(review => review.author === this.props.user).length ? true : false
    }
    formChangeHandler = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }
    patchReview = () => {
        const review = this.props.patch(this.state.reviewId, this.state.rating, this.state.contents);
        const reviews = [...this.state.reviews];
        reviews[reviews.findIndex(review => review._id === this.state.reviewId)] = review;
        this.setState({
            reviewId: null
        })
    }
    render() {
        const { title, author, year, isbn } = this.props.location.state;
        const reviews = this.props.reviews.map(review =>
            this.state.alreadyPosted ?
                (
                    <div key={this.state.user}>
                        <ul>
                            <li>{review.author}</li>
                            <li>{review.rating}</li>
                            <li>{review.contents}</li>
                        </ul>
                        <button onClick={() => this.setState({ editReview: true, reviewId: review._id })}>Edit</button>
                    </div>
                ) :
                (
                    <ul key={review._id}>
                        <li>{review.author}</li>
                        <li>{review.rating}</li>
                        <li>{review.contents}</li>
                    </ul>
                )
        );
        return (
            <div>
                <p>Title: {title}</p>
                <p>Author: {author}</p>
                <p>Year: {year}</p>
                <p>ISBN: {isbn}</p>
                {reviews}
                {!this.state.alreadyPosted || this.state.editReview ? (
                    <Container>
                        <Row>
                            <Col s={6} offset={'s3'}>
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    this.setState({
                                        alreadyPosted: true
                                    })
                                    this.props.post(this.props.user, title, this.state.rating, this.state.content);
                                }}>
                                        <Textarea label="Your review"
                                            name="content"
                                            id="content"
                                            s={12}
                                            value={this.state.content}
                                            onChange={this.formChangeHandler}
                                        />
                                    <Select 
                                        id="rating"
                                        name="rating" 
                                        value={this.state.rating} 
                                        onChange={this.formChangeHandler}
                                        s={12}
                                    >
                                        <option value="" disabled>Choose a rating</option>
                                        <option value="1">One star</option>
                                        <option value="2">Two stars</option>
                                        <option value="3">Three stars</option>
                                        <option value="4">Four stars</option>
                                        <option value="5">Five stars</option>
                                    </Select>
                                        <Button offset={'s2'} type='submit'>Submit</Button>
                                </form>
                            </Col>
                        </Row>
                    </Container>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.auth.user,
        reviews: state.search.searchResults
            .find(elem => elem.title === ownProps.location.state.title)
            .reviews
    }
}

const mapDispatchToProps = dispatch => {
    return {
        post: (author, title, rating, contents) => dispatch(actionTypes.postReview(author, title, rating, contents)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);