import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/actions'
import { Row, Col, Textarea, Select, Button } from 'react-materialize';

class BookPage extends Component {
    state = {
        addReview: true,
        editReview: false,
        rating: '',
        content: '',
        reviews: this.props.location.state.reviews,
        alreadyPosted: this.props.location.state.reviews.filter(review => review.author === this.props.user).length ? true : false
    }
    formChangeHandler = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }
    render() {
        const { title, author, year, isbn } = this.props.location.state;
        const reviews = this.state.reviews.map(review =>
            this.state.alreadyPosted ?
                (
                    <div key={this.state.user}>
                        <ul>
                            <li>{review.author}</li>
                            <li>{review.rating}</li>
                            <li>{review.contents}</li>
                        </ul>
                        <button onClick={() => this.setState({ editReview: true })}>Edit</button>
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
                    <Row>
                        <Col s={6} offset={'s3'}>
                            <form onSubmit={e => {
                                e.preventDefault();
                                this.props.post(this.props.user, title, this.state.rating, this.state.contents);
                                this.setState({
                                    reviews: this.state.reviews.concat({
                                        author: this.props.user,
                                        title,
                                        rating: this.state.rating,
                                        contents: this.state.contents
                                    }),
                                    alreadyPosted: true
                                })
                            }}>
                                <Textarea label="Your review"
                                    name='contents'
                                    id='contents'
                                    s={12}
                                    required
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
                                <Button type='submit' className="submit">Submit</Button>
                            </form>
                        </Col>
                    </Row>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        post: (author, title, rating, contents) => dispatch(actionTypes.postReview(author, title, rating, contents)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);