import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addSong } from '../reducers/player';

class AddToQueue extends Component {
  static propTypes = {
    addSong: PropTypes.func,
    song: PropTypes.object
  }

  render() {
    return (
      <button className="btn btn-primary" onClick={() => this.props.addSong(this.props.song)}>Add to queue</button>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ addSong }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(AddToQueue);
