import React from 'react';

class Haiku extends React.Component {
  render() {
    return(
      <div id="haiku">
        <h1 className="title">{this.props.title}</h1>
        <div className="content">
          <p>{this.props.content[0]}</p>
          <p>{this.props.content[1]}</p>
          <p>{this.props.content[2]}</p>
        </div>
        <div className="signature">
          <div className="counter">{this.props.selection+1}/{this.props.total}</div>
          <div className="date">{this.props.date}</div>
          <div className="author">Justin St-Amant</div>
        </div>
      </div>
    );
  }
}

export default Haiku;
