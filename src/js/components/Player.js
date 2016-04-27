import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { nextSong } from '../reducers/player';

class Player extends Component {
  static propTypes = {
    song: PropTypes.object,
    nextSong: PropTypes.func
  }

  constructor() {
    super();

    this.state = {
      stopped: true
    };

    this.start = () => {
      this.setState({
        song: this.props.song
      });
      this.refs.player.load();
      this.refs.player.onloadeddata = () => {
        this.setState({stopped: false});
        for (var i = 0; i <= 10; i++) this.setVolume(i, i * 100);
        this.refs.player.play();
      };
    };

    this.stop = (next) => {
      this.setState({stopped: true});
      for (var i = 10; i > 0; i--) {
        this.setVolume(i, (i * 100 - 1000) * -1);
      }

      setTimeout(() => {
        this.refs.player.pause();
        if (next) {
          this.props.nextSong();
        }
      }, 1000);
    };

    this.ending = () => {
      if (this.refs.player.currentTime > 10 && !this.state.stopped) {
        this.stop(true);
      }
    };

    this.setVolume = (i, delay) => {
      setTimeout(() => {
        this.refs.player.volume = i / 10;
      }, delay);
    };
  }

  componentDidMount() {
    this.refs.player.volume = 0;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.song !== this.props.song) {
      if (!this.state.stopped) {
        this.stop();
      }
      setTimeout(() => {
        this.start();
      }, this.state.stopped ? 0 : 1000);
    }
  }

  render() {
    const src = this.state.song && this.state.song.previewUrl;
    return (
      <audio
        ref="player"
        onTimeUpdate={this.ending}
      >
        <source src={src} />
      </audio>
    );
  }
}

function mapStateToProps(state) {
  return {
    song: state.player.playing && state.player.playing.song
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ nextSong }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
