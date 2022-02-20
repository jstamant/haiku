import React from 'react';

class Haiku extends React.Component {
  render() {
    return(
      <div id="haiku">
        <h1 className="title">{this.props.title}</h1>
        <p className="date">{this.props.date}</p>
        <div id="content">
          <p>{this.props.content[0]}</p>
          <p>{this.props.content[1]}</p>
          <p>{this.props.content[2]}</p>
        </div>
      </div>
    );
  }
}

export default Haiku;
