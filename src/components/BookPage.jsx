import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postReview, patchReview } from '../store/actions';
import ReviewForm from './ReviewForm';
import Review from './Review';
import Flash from './Flash';
import { Divider, Col, Row } from 'react-materialize';

class BookPage extends Component {
  state = {
    editReview: false,
    reviewId: null,
    alreadyPosted: !!this.props.reviews.filter(
      review => review.author === this.props.user
    ).length,
  };
  onReviewSubmit = (e, user, title, rating, content, reviewId) => {
    e.preventDefault();
    if (this.state.editReview) {
      const result = this.props.patch(user, title, rating, content, reviewId);
      if (!result.success) return;
      this.setState({ editReview: false });
    } else {
      const result = this.props.post(user, title, rating, content);
      if (!result.success) return;
      this.setState({ alreadyPosted: true });
    }
  };
  render() {
    const { title, author, year, isbn } = this.props.location.state;
    const { editReview, reviewId, alreadyPosted } = this.state;
    const reviews = this.props.reviews.map(review => (
      <Review
        key={review.user}
        user={review.user}
        author={review.author}
        rating={review.rating}
        contents={review.contents}
        editable={review.author === this.props.user}
        clickHandler={() =>
          this.setState({ editReview: true, reviewId: review._id })
        }
      />
    ));
    return (
      <>
        <Row>
          <Col s={10} m={8} offset={'m2 s1'} style={{ fontSize: '20px' }}>
            <p style={{ fontWeight: 'bold' }}>{title}</p>
            <p>by {author}</p>
            <p>Year: {year}</p>
            <p>ISBN: {isbn}</p>
            <h2
              style={{
                marginBottom: '10px',
                fontWeight: 'bold',
                fontSize: '15px',
              }}
            >
              User Reviews
            </h2>
            <Divider />
          </Col>
        </Row>
        <Row>
          <Col s={10} m={8} offset={'m2 s1'}>
            {reviews}
          </Col>
        </Row>
        <Flash />
        {(!alreadyPosted || editReview) && (
          <ReviewForm
            title={title}
            reviewId={reviewId}
            onReviewSubmit={this.onReviewSubmit}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user,
    reviews: state.search.searchResults.find(
      elem => elem.title === ownProps.location.state.title
    ).reviews,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    post: (author, title, rating, contents) =>
      dispatch(postReview(author, title, rating, contents)),
    patch: (author, title, rating, contents, reviewId) =>
      dispatch(patchReview(author, title, rating, contents, reviewId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
