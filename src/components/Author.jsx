import React from "react";
import { Col, Card } from "react-materialize";
import { Link } from "react-router-dom";

const author = ({ author, books }) => (
  <Col s={12} l={6}>
    <Card className="blue-grey darken-1 white-text" title={author}>
      <ul>
        {books.map(({ title, author, isbn, year, reviews }) => (
          <li key={isbn}>
            <Link
              to={{
                pathname: `/book/${title}`,
                state: { title, author, isbn, year, reviews }
              }}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  </Col>
);
export default author;
