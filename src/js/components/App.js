import React, { Component } from 'react';
import { Search, Results, Queue, Player } from './';

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <br />
            <h1>Search iTunes!</h1>
            <br />
            <Search />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Results />
          </div>
          <div className="col-md-6">
            <Player />
            <Queue />
          </div>
        </div>
      </div>
    );
  }
}
