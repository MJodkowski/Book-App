import React from "react";
import { Link } from "react-router-dom";
import { Col, Card, Collection, CollectionItem } from "react-materialize";

const book = ({ id, title, author, isbn, year, reviews }) => (
  <Col s={12} l={6}>
    <Card
      title={title}
      className="blue-grey darken-1 white-text"
      actions={[
        <Link
          to={{
            pathname: `/book/${title}`,
            state: { id, title, author, isbn, year, reviews }
          }}
        >
          Expand
        </Link>
      ]}
    >
      <Collection className="black-text no-border white-text">
        <CollectionItem className="teal lighten-1">{author}</CollectionItem>
        <CollectionItem className="teal lighten-1">{isbn}</CollectionItem>
        <CollectionItem className="teal lighten-1">{year}</CollectionItem>
      </Collection>
    </Card>
  </Col>
);
export default book;
