import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions/actions";
import ReviewForm from "./ReviewForm";
import Review from "./Review";

class BookPage extends Component {
  state = {
    editReview: false,
    reviewId: null,
    alreadyPosted: !!this.props.reviews.filter(
      review => review.author === this.props.user
    ).length
  };
  onReviewSubmit = (e, user, title, rating, content, reviewId) => {
    e.preventDefault();
    if (this.state.editReview) {
      this.props.patch(user, title, rating, content, reviewId);
      this.setState({ editReview: false });
    } else {
      this.setState({ alreadyPosted: true });
      this.props.post(user, title, rating, content);
    }
  };
  render() {
    const { title, author, year, isbn } = this.props.location.state;
    const { editReview, reviewId, alreadyPosted } = this.state;
    const reviews = this.props.reviews.map(review => (
      <Review
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
      <div>
        <p>Title: {title}</p>
        <p>Author: {author}</p>
        <p>Year: {year}</p>
        <p>ISBN: {isbn}</p>
        {reviews}
        {(!alreadyPosted || editReview) && (
          <ReviewForm
            title={title}
            reviewId={reviewId}
            onReviewSubmit={this.onReviewSubmit}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user,
    reviews: state.search.searchResults.find(
      elem => elem.title === ownProps.location.state.title
    ).reviews
  };
};

const mapDispatchToProps = dispatch => {
  return {
    post: (author, title, rating, contents) =>
      dispatch(actionTypes.postReview(author, title, rating, contents)),
    patch: (author, title, rating, contents, reviewId) =>
      dispatch(
        actionTypes.patchReview(author, title, rating, contents, reviewId)
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
