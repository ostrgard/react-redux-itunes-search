import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { AddToQueue } from './';

class Results extends Component {
  static propTypes = {
    result: PropTypes.array
  }

  render() {
    return this.props.result && this.props.result.length > 0 ? (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Artist</th>
            <th>Track</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.result.map((song, index) => (
            <tr key={index}>
              <td>{song.artistName}</td>
              <td>{song.trackName}</td>
              <td><AddToQueue song={song} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : <div />;
  }
}

function mapStateToProps(state) {
  return {
    result: state.search.result
  };
}

export default connect(mapStateToProps)(Results);
