import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_RECIPIES':
      return {
        ...state,
        recipes_list: action.payload,
        heading: 'Search Results'
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    recipes_list: [],
    heading: 'Top Recipes',
    dispatch: action => this.setState(state => reducer(state, action))
  };

  componentDidMount = () => {
    axios
      .get(
        `http://api.yummly.com/v1/api/recipes?_app_id=108507b6&_app_key=dc94d5f4c0691f5dc5db17fb6deb0ca4&`
      )
      .then(res => {
        this.setState({ recipes_list: res.data.matches });
        //console.log(this.state);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Context.Provider value={this.state}>
          {this.props.children}
        </Context.Provider>
      </div>
    );
  }
}
export const Consumer = Context.Consumer;
