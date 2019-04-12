import React from 'react';
import { Link } from 'react-router-dom';

const Recipe = props => {
  //console.log(props);
  const { recipeName, sourceName, rating, id } = props;
  return (
    <div className='col-md-6'>
      <div className='card mb-4 shadow-sm'>
        <div className='card-body'>
          <h5>{recipeName}</h5>
          <p className='card-text'>
            <strong>
              <i className='fas fa-play' /> Source
            </strong>
            : {sourceName}
            <br />
            <strong>
              <i className='fas fa-bacon' /> Rating
            </strong>
            : {rating}
          </p>
          <Link to={`/recipies/${id}`} className='btn btn-dark btn-block'>
            <i className='fas fa-chevron-right' />
            View Ingredients
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
