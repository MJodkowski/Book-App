import React from 'react';

export default ({ author, rating, contents, editable, clickHandler}) => {
  return (
    <div>
      <ul>
        <li>{author}</li>
        <li>{rating}</li>
        <li>{contents}</li>
      </ul>
      {editable && <button onClick={clickHandler}>Edit</button>}
    </div>
  )
}