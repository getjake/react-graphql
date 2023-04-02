import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends Component {
  renderSongs() {
    // handle loading state
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return this.props.data.songs.map((song) => {
      return (
        <li key={song.id} className='collection-item'>
          {song.title}
        </li>
      );
    });
  }

  render() {
    return <ul className='collection'>{this.renderSongs()}</ul>;
  }
}

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList); // Similar to connect() in Redux
// Songlist is a component that is wrapped by the graphql helper
