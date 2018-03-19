import React, { Component } from 'react';

export default class SearchUserInput extends Component {

  onSearch(e) {
    this.props.handleSearch(e.target.value);
  }

  render() {
    return (
      <input
        type="name"
        onChange = { ::this.onSearch }
        className="form-control"
        placeholder="Search"
      />
    );
  }
}
