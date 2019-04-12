import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

class Ingredients extends Component {
  state = {
    recipe: {},
    ingredients: {},
    images: {},
    source: {}
  };

  componentDidMount = () => {
    axios
      .get(
        `http://api.yummly.com/v1/api/recipe/${
          this.props.match.params.id
        }?_app_id=108507b6&_app_key=dc94d5f4c0691f5dc5db17fb6deb0ca4`
      )
      .then(res => {
        this.setState({ ingredients: res.data.ingredientLines });
        this.setState({ recipe: res.data.name });
        this.setState({ images: res.data.images[0].hostedLargeUrl });
        this.setState({ source: res.data.source.sourceRecipeUrl });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { ingredients, recipe, images, source } = this.state;
    if (
      ingredients === undefined ||
      recipe === undefined ||
      images === undefined ||
      source === undefined ||
      Object.keys(ingredients).length === 0 ||
      Object.keys(recipe).length === 0 ||
      Object.keys(images).length === 0 ||
      Object.keys(source).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <Link to='/' className='btn btn-dark btn-sm mb-4'>
            Go Back
          </Link>
          <div className='card'>
            <h5 className='card-header'>{recipe}</h5>
            <img src={images} alt='pictures of food' />
            <div className='card-body'>
              <div className='card-text'>
                {ingredients.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>

              <br />
              <a href={source} target='_blank'>
                See Full Recipe
              </a>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Ingredients;
