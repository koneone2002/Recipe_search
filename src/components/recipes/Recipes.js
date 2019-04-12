import React, { Component } from 'react';
import { Consumer } from '../../context';
import Spinner from '../layout/Spinner';
import Recipe from './Recipe';

class Recipes extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          //console.log(value);
          const { recipes_list, heading } = value;
          if (recipes_list === undefined || recipes_list.length === 0) {
            return <Spinner />;
          } else {
            return (
              <React.Fragment>
                <h3 className='text-center mb-4'>{heading}</h3>
                <div className='row'>
                  {recipes_list.map(item => (
                    <Recipe
                      recipeName={item.recipeName}
                      smallImageUrls={item.smallImageUrls}
                      sourceName={item.sourceDisplayName}
                      ingredients={item.ingredients}
                      rating={item.rating}
                      id={item.id}
                      key={item.id}
                    />
                  ))}
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}
export default Recipes;
