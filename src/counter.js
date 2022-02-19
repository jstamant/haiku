import React from 'react';

class Counter extends React.Component {
  render() {
    return(
      <p id="counter">Haiku {this.props.selection}/?</p>
    );
  }
}

export default Counter;
