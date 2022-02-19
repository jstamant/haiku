import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
  }

  render() {
    return(
      <button id={this.id}>{this.id}</button>
    );
  }
}

export default Button;
