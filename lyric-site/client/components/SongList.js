import React, { Component } from 'react';
import { Link } from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import query from '../queries/fetchSongs';

class SongList extends Component {
  onSongDelete(id, title) {
    this.props
      .mutate({
        variables: {
          id,
        },
      })
      .then(() => this.props.data.refetch());
  }

  renderSongs() {
    // handle loading state
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return this.props.data.songs.map(({ title, id }) => {
      return (
        <li key={id} className='collection-item'>
          {title}
          <i
            className='material-icons'
            onClick={() => this.onSongDelete(id, title)}
          >
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <ul className='collection'>{this.renderSongs()}</ul>
        <Link to='/songs/new' className='btn-floating btn-large red right'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    );
  }
}

// Implement Deletion
const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(query)(SongList));
