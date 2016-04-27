import React, { Component, PropTypes } from 'react';

export default class QueueItem extends Component {
  static propTypes = {
    play: PropTypes.func,
    playing: PropTypes.bool,
    song: PropTypes.object
  }

  render() {
    return (
      <tr>
        <td>{this.props.song.artistName}</td>
        <td>{this.props.song.trackName}</td>
        <td>
          <button
            onClick={this.props.play}
            className="btn btn-primary"
          >
            {this.props.playing ? 'Playing...' : 'Play'}
          </button>
        </td>
      </tr>
    );
  }
}
