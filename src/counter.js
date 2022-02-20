import React from 'react';

class Counter extends React.Component {
  render() {
    return(
      <p id="counter">Haiku {this.props.selection+1}/{this.props.total}</p>
    );
  }
}

export default Counter;
