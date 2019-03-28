import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      text: ""
    }
  }
  handleChange(value) {
    this.setState({text: value })
  }
  
  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input onChange={(event) => this.props.searchPostFn(event.target.value)}placeholder="Search Your Feed" />

          <SearchIcon id="Search__icon" />
        </div>
        
      </section>
    )
  }
}