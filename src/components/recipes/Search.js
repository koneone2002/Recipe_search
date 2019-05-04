import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

class Search extends Component {
  state = {
    ingredient: ''
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  findRecipe = (dispatch, e) => {
    e.preventDefault();

    axios
      .get(
        `https://api.yummly.com/v1/api/recipes?_app_id=108507b6&_app_key=dc94d5f4c0691f5dc5db17fb6deb0ca4&q=$&allowedIngredient[]=${
          this.state.ingredient
        }&requirePictures=true&maxResult=10`
      )
      .then(res => {
        dispatch({
          type: 'SEARCH_RECIPES',
          payload: res.data.matches
        });
        //console.log(res.data);
        this.setState({ ingredient: '' });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className='card card-body mb-4 p-4'>
              <h1 className='display-4 text-center'>
                <i className='fas fa-bacon' /> Search For a Recipe
              </h1>
              <p className='lead text-center'>
                Get recipes for your favorite ingredients
              </p>
              <form onSubmit={this.findRecipe.bind(this, dispatch)}>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='ingredient'
                    name='ingredient'
                    value={this.state.ingredient}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  className='btn btn-primary btn-lg btn-block mb-5'
                  type='submit'
                >
                  Get Ingredient Recipes
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
