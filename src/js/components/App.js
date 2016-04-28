import React, { Component } from 'react';

import { Search, Results, Queue, Player } from './';

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <br />
            <h1>Music!</h1>
            <br />
            {false && <Search />}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {false && <Results />}
          </div>
          <div className="col-md-6">
            {false && <Player />}
            {false && <Queue />}
          </div>
        </div>
      </div>
    );
  }
}
