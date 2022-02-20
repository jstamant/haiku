import React from 'react';

class Interface extends React.Component {
  render() {
    return(
      <>
        <button onClick={this.props.changeHaiku}>NEXT</button>
        <button onClick={() => this.props.changeHaiku(false)}>PREVIOUS</button>
      </>
    );
  }
}

export default Interface;
