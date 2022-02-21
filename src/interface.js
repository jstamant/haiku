import React from 'react';

class Interface extends React.Component {
  render() {
    return(
      <div id="interface">
        <div className="half">
          <button onClick={() => this.props.changeHaiku("previous")}>Previous</button>
        </div>
        <div className="half">
          <button onClick={this.props.changeHaiku}>Next</button>
        </div>
        <div className="full">
          <button onClick={() => this.props.changeHaiku("random")}>Random</button>
        </div>
      </div>
    );
  }
}

export default Interface;
