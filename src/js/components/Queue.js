import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { playSong } from '../reducers/player';
import { QueueItem } from './';

class Queue extends Component {
  static propTypes = {
    queue: PropTypes.array,
    playing: PropTypes.object,
    playSong: PropTypes.func
  }

  render() {
    return !this.props.queue || this.props.queue.length <= 0 ? <div /> : (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Artist</th>
            <th>Track</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.queue.map((song) => (
            <QueueItem
              key={song.id}
              song={song.song}
              play={() => this.props.playSong(song.id)}
              playing={this.props.playing && this.props.playing.id === song.id}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    queue: state.player.queue,
    playing: state.player.playing
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ playSong }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Queue);
