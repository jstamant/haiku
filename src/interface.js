import React from 'react';

class Interface extends React.Component {
  render() {
    return(
      <>
        <button onClick={this.props.changeHaiku}>Next</button>
        <button onClick={() => this.props.changeHaiku(false)}>Previous</button>
        <button onClick={this.props.randomHaiku}>Random</button>
      </>
    );
  }
}

export default Interface;
