import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Textarea,
  Select,
  Button
} from "react-materialize";

class ReviewForm extends Component {
  state = {
    rating: "",
    content: ""
  };
  formChangeHandler = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    const { user, reviewId, title, onReviewSubmit } = this.props;
    const { content, rating } = this.state;
    return (
      <Container>
        <Row>
          <Col s={10} m={6} offset={"m3"}>
            <form
              onSubmit={e =>
                onReviewSubmit(e, user, title, rating, content, reviewId)
              }
            >
              <Textarea
                label="Your review"
                name="content"
                id="content"
                s={12}
                value={content}
                onChange={this.formChangeHandler}
              />
              <Select
                id="rating"
                name="rating"
                value={rating}
                onChange={this.formChangeHandler}
                s={12}
              >
                <option value="" disabled>
                  Choose a rating
                </option>
                <option value="1">One star</option>
                <option value="2">Two stars</option>
                <option value="3">Three stars</option>
                <option value="4">Four stars</option>
                <option value="5">Five stars</option>
              </Select>
              <Button offset={"s2"} type="submit">
                Submit
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(ReviewForm);
