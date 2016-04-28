import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { searchAction } from '../reducers/search';

class Search extends Component {
  static propTypes = {
    searchAction: PropTypes.func,
    status: PropTypes.string,
    term: PropTypes.string,
    error: PropTypes.string,
    results: PropTypes.array
  }

  render() {
    let status = 'form-group';
    let msg = 'Search for a song or an artist';

    if (this.props.status === 'searching') {
      msg = 'Searching for';
    } else if (this.props.status === 'success') {
      msg = 'Showing results for';
      status = 'form-group has-success';
    } else if (this.props.status === 'fail') {
      msg = 'No results for';
      status = 'form-group has-error';
    }

    return (
      <form>
        <div className={status}>
          <div className="input-group">
            <div className="input-group-addon">{msg}</div>
            <input
              className="form-control"
              placeholder="ie. Veto, Elvis Presley, Rodriguez"
              value={this.props.term}
              onChange={(event) => this.props.searchAction(event.target.value)}
            />
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.search.status,
    term: state.search.term,
    error: state.search.error,
    result: state.search.result
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ searchAction }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
