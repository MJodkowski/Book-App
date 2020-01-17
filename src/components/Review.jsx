import React from 'react';
import { Card, Row, Col, Button, Divider } from 'react-materialize';

export default ({ author, rating, contents, editable, clickHandler }) => {
  return (
    <Row>
      <Col s={12}>
        <Card style={{ marginTop: '20px' }}>
          <ul>
            <li style={{ marginBottom: '10px' }}>{author} rated it {rating} out of 5</li>
            <Divider />
            <li style={{ marginTop: '15px' }}>{contents}</li>
          </ul>
          {editable && <Button onClick={clickHandler}>Edit</Button>}
        </Card>
      </Col>
    </Row>
  );
};
