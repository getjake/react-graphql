import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';

class SongDetail extends Component {
  render() {
    console.log(this.props.data.song)
    return (
      <div>
        <h3>{}</h3>
      </div>
    );
  }
}

// This is how GraphQL catch the params in the URI.
export default graphql(fetchSong, {
  options: (props) => {
    return {
      variables: {
        id: props.params.id
      }
    }
  }
})(SongDetail);
